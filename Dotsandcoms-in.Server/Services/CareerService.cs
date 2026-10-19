using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using Dotsandcoms_in.Server.Data;
using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Dotsandcoms_in.Server.Services
{
    public class CareerService : ICareerService
    {
        private static readonly HashSet<string> PhotoExt = new(StringComparer.OrdinalIgnoreCase) { ".jpg", ".jpeg", ".png", ".gif" };
        private static readonly HashSet<string> ResumeExt = new(StringComparer.OrdinalIgnoreCase) { ".pdf", ".doc", ".docx" };
        private const long MaxBytes = 5 * 1024 * 1024;

        private readonly AppDbContext _db;
        private readonly IEmailService _email;
        private readonly ITokenService _tokens;
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _config;

        public CareerService(AppDbContext db, IEmailService email, ITokenService tokens, IWebHostEnvironment env, IConfiguration config)
        {
            _db = db;
            _email = email;
            _tokens = tokens;
            _env = env;
            _config = config;
        }

        public async Task SendOtpAsync(CareerOtpRequest request)
        {
            var purpose = NormalizePurpose(request.Purpose);
            var email = NormalizeEmail(request.Email);
            if (purpose == "apply")
                ValidateGate(request.FirstName, request.Surname, email, request.Mobile, request.RegistrationType, request.JobSlug);

            await StoreAndMailOtpAsync(email, purpose, reveal: false, request);
        }

        public async Task ResendOtpAsync(string email, string purpose)
        {
            purpose = NormalizePurpose(purpose);
            email = NormalizeEmail(email);
            var previous = await LatestOtp(email, purpose);
            if (previous == null)
                throw new InvalidOperationException("Send the code before requesting another one.");

            var request = new CareerOtpRequest
            {
                Purpose = purpose,
                Email = email,
                FirstName = previous.FirstName,
                Surname = previous.Surname,
                Mobile = previous.Mobile,
                RegistrationType = previous.RegistrationType,
                JobSlug = previous.JobSlug
            };
            await StoreAndMailOtpAsync(email, purpose, reveal: true, request);
        }

        public async Task<string> RevealOtpAsync(string email, string purpose)
        {
            purpose = NormalizePurpose(purpose);
            email = NormalizeEmail(email);
            var otp = await LatestOtp(email, purpose);
            if (otp == null || otp.Used || otp.ExpiresAt < DateTime.UtcNow || !otp.RevealAllowed)
                throw new InvalidOperationException("Try using this OTP, or attempt again later.");
            return otp.Code;
        }

        public async Task<CareerVerifyResult> VerifyOtpAsync(CareerVerifyRequest request)
        {
            var purpose = NormalizePurpose(request.Purpose);
            var email = NormalizeEmail(request.Email);
            var code = (request.Code ?? "").Trim();
            var otp = await LatestOtp(email, purpose);
            if (otp == null || otp.Used || otp.ExpiresAt < DateTime.UtcNow || otp.Code != code)
                throw new InvalidOperationException("OTP does not matched. Please enter correct OTP.");

            otp.Used = true;
            if (purpose == "status")
            {
                var existing = await SubmittedByEmail(email);
                await _db.SaveChangesAsync();
                if (existing == null)
                    return new CareerVerifyResult { Outcome = "missing", Message = "It seems you have not applied for the job before." };
                return new CareerVerifyResult { Outcome = "status", StatusToken = IssueStatusToken(existing.Id) };
            }

            var position = await RequireOpenPositionAsync(otp.JobSlug);
            var title = position.PageHeading;
            var location = position.Location;

            var submitted = await SubmittedByEmail(email);
            if (submitted != null)
            {
                await _db.SaveChangesAsync();
                return new CareerVerifyResult { Outcome = "existing", StatusToken = IssueStatusToken(submitted.Id) };
            }

            var draft = await _db.JobApplications
                .FirstOrDefaultAsync(a => a.Email == email && !a.IsSubmitted);
            if (draft == null)
            {
                draft = new JobApplication
                {
                    Email = email,
                    DraftToken = NewToken(),
                    CreatedAt = DateTime.UtcNow,
                    StatusId = CareerStatusIds.ReviewPending
                };
                _db.JobApplications.Add(draft);
            }
            else if (string.IsNullOrWhiteSpace(draft.DraftToken))
            {
                draft.DraftToken = NewToken();
            }

            draft.FirstName = otp.FirstName;
            draft.Surname = otp.Surname;
            draft.Mobile = otp.Mobile;
            draft.RegistrationType = otp.RegistrationType;
            draft.JobSlug = otp.JobSlug;
            draft.JobTitle = title;
            draft.Location = location;
            draft.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            return new CareerVerifyResult { Outcome = "draft", DraftToken = draft.DraftToken };
        }

        public async Task<CareerDraftDto> GetDraftAsync(string draftToken)
        {
            var app = await RequireDraft(draftToken);
            return MapDraft(app);
        }

        public async Task SaveStepAsync(string draftToken, int step, CareerStepRequest request, CareerUpload? photo, CareerUpload? resume)
        {
            var app = await RequireDraft(draftToken);
            await RequireOpenPositionAsync(app.JobSlug);
            if (step == 1) ApplyPersonal(app, request, photo);
            else if (step == 2) ApplyEducation(app, request);
            else if (step == 3) ApplyExperience(app, request);
            else if (step == 4) ApplyResume(app, request, resume, requiredFile: true);
            else throw new InvalidOperationException("Unknown application step.");

            app.CompletedStep = Math.Max(app.CompletedStep, step);
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        public async Task<CareerSubmitResult> SubmitAsync(string draftToken)
        {
            var app = await RequireDraft(draftToken);
            await RequireOpenPositionAsync(app.JobSlug);
            ValidateComplete(app);
            app.IsSubmitted = true;
            app.CompletedStep = 4;
            app.StatusId = CareerStatusIds.ReviewPending;
            app.StatusUpdatedAt = DateTime.UtcNow;
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
            app.ReferenceCode = $"DNC{DateTime.UtcNow:yyyy}{app.Id:D5}";
            await _db.SaveChangesAsync();

            var fullName = $"{app.FirstName} {app.Surname}".Trim();
            await SafeMail(app.Email, "", "", fullName, "Your application reference code", CandidateReceivedHtml(app));

            var hr = _config["Careers:NotifyEmail"];
            if (!string.IsNullOrWhiteSpace(hr))
            {
                await SafeMail(hr, "", app.Email, fullName, $"New job application {app.ReferenceCode}", HrHtml(app));
            }

            return new CareerSubmitResult { ReferenceCode = app.ReferenceCode, JobTitle = app.JobTitle };
        }

        public async Task<CareerStatusViewDto> GetStatusAsync(string statusToken)
        {
            var app = await RequireStatusToken(statusToken);
            return MapStatus(app);
        }

        public async Task ReplaceResumeAsync(string statusToken, CareerUpload resume)
        {
            var app = await RequireStatusToken(statusToken);
            if (!CanReplace(app))
                throw new InvalidOperationException("Resume replacement is closed until you can apply again.");
            if (resume == null) throw new InvalidOperationException("Upload Resume is required.");
            SaveUpload(resume, ResumeExt, "resumes", out var stored, out var original);
            app.ResumeStoredName = stored;
            app.ResumeOriginalName = original;
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        public async Task<CareerListResult> ListAsync(CareerListQuery query)
        {
            var page = query.Page < 1 ? 1 : query.Page;
            var size = query.PageSize is < 1 or > 200 ? 100 : query.PageSize;
            var q = _db.JobApplications.AsNoTracking().Include(a => a.Status).Where(a => a.IsSubmitted);
            q = (query.List ?? "active").ToLowerInvariant() switch
            {
                "old" => q.Where(a => a.IsOldResume && !a.IsHidden),
                "hidden" => q.Where(a => a.IsHidden),
                _ => q.Where(a => !a.IsHidden && !a.IsOldResume)
            };
            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                var name = query.Name.Trim().ToLower();
                q = q.Where(a => (a.FirstName + " " + a.Surname).ToLower().Contains(name) || a.Email.Contains(name));
            }
            if (!string.IsNullOrWhiteSpace(query.Gender))
                q = q.Where(a => a.Gender == query.Gender);
            if (!string.IsNullOrWhiteSpace(query.Medium))
                q = q.Where(a => a.SchoolMedium == query.Medium);
            if (!string.IsNullOrWhiteSpace(query.Position))
                q = q.Where(a => a.JobSlug == query.Position || a.JobTitle == query.Position);
            if (!string.IsNullOrWhiteSpace(query.Location))
                q = q.Where(a => a.Location == query.Location);
            if (!string.IsNullOrWhiteSpace(query.RegistrationType))
                q = q.Where(a => a.RegistrationType == query.RegistrationType);
            if (query.StatusId.HasValue)
                q = q.Where(a => a.StatusId == query.StatusId.Value);

            var desc = !string.Equals(query.ExperienceSort, "asc", StringComparison.OrdinalIgnoreCase);
            q = desc
                ? q.OrderByDescending(a => a.IsFresher ? 0 : a.ExperienceYears * 12 + a.ExperienceMonths).ThenByDescending(a => a.CreatedAt)
                : q.OrderBy(a => a.IsFresher ? 0 : a.ExperienceYears * 12 + a.ExperienceMonths).ThenByDescending(a => a.CreatedAt);

            var total = await q.CountAsync();
            var rows = await q.Skip((page - 1) * size).Take(size).ToListAsync();
            return new CareerListResult
            {
                TotalCount = total,
                Page = page,
                PageSize = size,
                Items = rows.Select(a => new CareerListItemDto
                {
                    Id = a.Id,
                    Name = $"{a.FirstName} {a.Surname}".Trim(),
                    Experience = ExperienceText(a),
                    Gender = a.Gender,
                    SchoolMedium = a.SchoolMedium,
                    Position = a.JobTitle,
                    Location = a.Location,
                    RegistrationType = a.RegistrationType,
                    StatusId = a.StatusId,
                    StatusLabel = a.Status?.ShortLabel ?? "",
                    StatusIcon = a.Status?.Icon ?? "unprocessed.png"
                }).ToList()
            };
        }

        public async Task<CareerDetailDto?> GetDetailAsync(int id)
        {
            var app = await _db.JobApplications.AsNoTracking().Include(a => a.Status).FirstOrDefaultAsync(a => a.Id == id && a.IsSubmitted);
            return app == null ? null : MapDetail(app);
        }

        public async Task<(Stream Stream, string FileName, string ContentType)?> OpenFileAsync(int id, string kind)
        {
            var app = await _db.JobApplications.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id);
            if (app == null) return null;
            var stored = kind == "photo" ? app.PhotoStoredName : app.ResumeStoredName;
            var original = kind == "photo" ? app.PhotoOriginalName : app.ResumeOriginalName;
            if (string.IsNullOrWhiteSpace(stored)) return null;
            var folder = kind == "photo" ? "photos" : "resumes";
            var path = Path.Combine(StorageRoot(folder), stored);
            if (!File.Exists(path)) return null;
            var stream = File.OpenRead(path);
            return (stream, original ?? stored, ContentTypeFor(path));
        }

        public async Task SaveNoteAsync(int id, string note)
        {
            var app = await RequireSubmitted(id);
            app.OfficeNote = note ?? "";
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        public async Task<CareerStatusChangeResult> ChangeStatusAsync(int id, CareerStatusChangeRequest request)
        {
            var app = await RequireSubmitted(id);
            var status = await _db.CareerStatuses.FirstOrDefaultAsync(s => s.Id == request.StatusId && s.ShowInRadio);
            if (status == null) throw new InvalidOperationException("Select an application status.");

            app.StatusId = status.Id;
            app.StatusUpdatedAt = DateTime.UtcNow;
            app.OfficeNote = request.OfficeNote ?? app.OfficeNote;
            app.IsOldResume = request.IsOldResume;
            app.ReapplyAfter = status.LockDays > 0 ? DateTime.UtcNow.Date.AddDays(status.LockDays) : null;
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            if (request.SendMail)
            {
                app.Status = status;
                await SafeMail(app.Email, "", "", $"{app.FirstName} {app.Surname}".Trim(),
                    "The status of your resume is updated",
                    StatusEmailHtml(app, status));
            }

            if (status.Id == CareerStatusIds.Accepted)
            {
                app.IsHidden = true;
                await _db.SaveChangesAsync();
                return new CareerStatusChangeResult { Hidden = true, Message = "You have successfully hide the resume." };
            }

            return new CareerStatusChangeResult { Hidden = false, Message = "Status updated." };
        }

        public async Task HideAsync(int id)
        {
            var app = await RequireSubmitted(id);
            app.IsHidden = true;
            app.UpdatedAt = DateTime.UtcNow;
            await _db.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<CareerStatusOptionDto>> StatusOptionsAsync(bool radioOnly)
        {
            var q = _db.CareerStatuses.AsNoTracking().OrderBy(s => s.SortOrder);
            var rows = await (radioOnly ? q.Where(s => s.ShowInRadio) : q).ToListAsync();
            return rows.Select(s => new CareerStatusOptionDto
            {
                Id = s.Id,
                ShortLabel = s.ShortLabel,
                Summary = s.Summary,
                Icon = s.Icon,
                LockDays = s.LockDays,
                ShowInRadio = s.ShowInRadio
            }).ToList();
        }

        public async Task<CareerMassEmailDto> CreateMassEmailAsync(CareerMassEmailRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Subject) || string.IsNullOrWhiteSpace(request.HtmlBody))
                throw new InvalidOperationException("Subject and message are required.");
            if (request.StatusIds == null || request.StatusIds.Count == 0)
                throw new InvalidOperationException("Select at least one status.");
            var row = new CareerMassEmail
            {
                Position = string.IsNullOrWhiteSpace(request.Position) ? "All" : request.Position.Trim(),
                ResumeSet = NormalizeSet(request.ResumeSet),
                StatusIds = string.Join(",", request.StatusIds.Distinct()),
                FromAddress = (request.FromAddress ?? "").Trim(),
                Subject = request.Subject.Trim(),
                HtmlBody = request.HtmlBody,
                State = "Pending",
                CreatedAt = DateTime.UtcNow
            };
            _db.CareerMassEmails.Add(row);
            await _db.SaveChangesAsync();
            if (request.SendNow)
                return await SendMassEmailAsync(row.Id);
            return MapMass(row);
        }

        public async Task<IReadOnlyList<CareerMassEmailDto>> ListMassEmailsAsync(string? state)
        {
            var q = _db.CareerMassEmails.AsNoTracking().OrderByDescending(m => m.CreatedAt).AsQueryable();
            if (!string.IsNullOrWhiteSpace(state))
                q = q.Where(m => m.State == state);
            var rows = await q.Take(200).ToListAsync();
            return rows.Select(MapMass).ToList();
        }

        public async Task<CareerMassEmailDto> SendMassEmailAsync(int id)
        {
            var row = await _db.CareerMassEmails.FirstOrDefaultAsync(m => m.Id == id);
            if (row == null) throw new InvalidOperationException("Email was not found.");
            if (row.State == "Cancelled") throw new InvalidOperationException("This email was cancelled.");
            if (row.State == "Sent") return MapMass(row);

            var ids = row.StatusIds.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToList();
            var people = _db.JobApplications.AsNoTracking().Where(a => a.IsSubmitted && !a.IsHidden && ids.Contains(a.StatusId));
            if (!string.Equals(row.Position, "All", StringComparison.OrdinalIgnoreCase))
                people = people.Where(a => a.JobSlug == row.Position);
            people = row.ResumeSet switch
            {
                "Old" => people.Where(a => a.IsOldResume),
                "New" => people.Where(a => !a.IsOldResume),
                _ => people
            };
            var recipients = await people.Select(a => a.Email).Distinct().ToListAsync();
            var failures = 0;
            foreach (var to in recipients)
            {
                try
                {
                    await _email.SendEmailAsync(to, "", row.FromAddress, row.Subject, row.HtmlBody);
                }
                catch
                {
                    failures++;
                }
            }
            row.RecipientCount = recipients.Count - failures;
            row.State = failures == recipients.Count && recipients.Count > 0 ? "Pending" : "Sent";
            row.SentAt = row.State == "Sent" ? DateTime.UtcNow : null;
            row.Error = failures > 0 ? $"{failures} message(s) could not be sent." : null;
            await _db.SaveChangesAsync();
            return MapMass(row);
        }

        public async Task CancelMassEmailAsync(int id)
        {
            var row = await _db.CareerMassEmails.FirstOrDefaultAsync(m => m.Id == id);
            if (row == null) throw new InvalidOperationException("Email was not found.");
            if (row.State == "Sent") throw new InvalidOperationException("A sent email cannot be cancelled.");
            row.State = "Cancelled";
            await _db.SaveChangesAsync();
        }

        private async Task<JobPosition> RequireOpenPositionAsync(string? slug)
        {
            var key = (slug ?? "").Trim();
            var job = await _db.JobPositions.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Slug.ToLower() == key.ToLower());
            if (job == null || !job.IsVacancyOpen)
                throw new InvalidOperationException("Select a role from the vacancy board.");
            return job;
        }

        private async Task StoreAndMailOtpAsync(string email, string purpose, bool reveal, CareerOtpRequest request)
        {
            if (purpose == "apply")
                await RequireOpenPositionAsync(request.JobSlug);

            var stale = await _db.CareerOtps.Where(o => o.Email == email && o.Purpose == purpose && !o.Used).ToListAsync();
            _db.CareerOtps.RemoveRange(stale);
            var code = RandomNumberGenerator.GetInt32(0, 1000000).ToString("D6");
            var name = purpose == "apply" ? $"{request.FirstName} {request.Surname}".Trim() : "Candidate";
            _db.CareerOtps.Add(new CareerOtp
            {
                Email = email,
                Purpose = purpose,
                Code = code,
                FirstName = (request.FirstName ?? "").Trim(),
                Surname = (request.Surname ?? "").Trim(),
                Mobile = Digits(request.Mobile),
                RegistrationType = request.RegistrationType == "Internship" ? "Internship" : "Job",
                JobSlug = request.JobSlug ?? "",
                ExpiresAt = DateTime.UtcNow.AddMinutes(10),
                RevealAllowed = reveal,
                CreatedAt = DateTime.UtcNow
            });
            await _db.SaveChangesAsync();
            await _email.SendEmailAsync(email, "", "", "Verify your email address", OtpHtml(name, code), name);
        }

        private void ApplyPersonal(JobApplication app, CareerStepRequest request, CareerUpload? photo)
        {
            var mobile = Digits(request.Mobile);
            if (mobile.Length is < 6 or > 12) throw new InvalidOperationException("Mobile is required.");
            if (!DateTime.TryParse(request.BirthDate, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal, out var birth)
                && !DateTime.TryParse(request.BirthDate, out birth))
                throw new InvalidOperationException("Birthdate is required.");
            birth = birth.Date;
            var age = AgeYears(birth);
            if (age < 18 || age > 58) throw new InvalidOperationException("Birthdate must be between 18 and 58 years.");
            var gender = request.Gender == "Female" ? "Female" : request.Gender == "Male" ? "Male" : "";
            if (gender == "") throw new InvalidOperationException("Gender is required.");
            var medium = RequireMedium(request.SchoolMedium);
            if (photo == null && string.IsNullOrWhiteSpace(app.PhotoStoredName))
                throw new InvalidOperationException("Please upload your photo.");
            if (photo != null)
            {
                SaveUpload(photo, PhotoExt, "photos", out var stored, out var original);
                app.PhotoStoredName = stored;
                app.PhotoOriginalName = original;
            }
            app.CountryCode = string.IsNullOrWhiteSpace(request.CountryCode) ? "+91" : request.CountryCode.Trim();
            app.Mobile = mobile;
            app.BirthDate = birth;
            app.Gender = gender;
            app.SchoolMedium = medium;
            app.Facebook = (request.Facebook ?? "").Trim();
            app.LinkedIn = (request.LinkedIn ?? "").Trim();
            app.Twitter = (request.Twitter ?? "").Trim();
        }

        private static void ApplyEducation(JobApplication app, CareerStepRequest request)
        {
            app.SchoolName = Required(request.SchoolName, "School Name");
            app.SchoolCity = Required(request.SchoolCity, "School City");
            app.SchoolMedium = RequireMedium(request.SchoolMedium);
            app.GraduationDegree = Required(request.GraduationDegree, "Graduation Obtained Degree");
            app.GraduationInstitute = Required(request.GraduationInstitute, "Graduation Institute Name");
            app.GraduationCity = Required(request.GraduationCity, "Graduation City");
            app.PostGraduationDegree = (request.PostGraduationDegree ?? "").Trim();
            app.PostGraduationInstitute = (request.PostGraduationInstitute ?? "").Trim();
            app.PostGraduationCity = (request.PostGraduationCity ?? "").Trim();
        }

        private static void ApplyExperience(JobApplication app, CareerStepRequest request)
        {
            app.IsFresher = request.IsFresher;
            app.JoinDays = request.JoinDays ?? throw new InvalidOperationException("Able to join in how many days ?");
            if (app.JoinDays < 0) throw new InvalidOperationException("Able to join in how many days ?");
            if (request.IsFresher)
            {
                app.ExperienceYears = 0;
                app.ExperienceMonths = 0;
                app.CurrentlyWorking = false;
                ClearEmployment(app);
                return;
            }
            if (request.ExperienceYears is < 0 or > 15 || request.ExperienceMonths is < 0 or > 11)
                throw new InvalidOperationException("Total experience is required.");
            app.ExperienceYears = request.ExperienceYears;
            app.ExperienceMonths = request.ExperienceMonths;
            app.CurrentlyWorking = request.CurrentlyWorking;
            if (request.CurrentlyWorking)
            {
                app.CurrentCompany = Required(request.CurrentCompany, "Current Company Name");
                app.CurrentCity = Required(request.CurrentCity, "Current City name");
                app.CurrentDesignation = Required(request.CurrentDesignation, "Current Designation");
                app.CurrentDurationMonths = Required(request.CurrentDurationMonths, "Current Job Duration");
                app.CurrentProfile = Required(request.CurrentProfile, "Job Profile");
            }
            else
            {
                app.CurrentCompany = "";
                app.CurrentCity = "";
                app.CurrentDesignation = "";
                app.CurrentDurationMonths = "";
                app.CurrentProfile = "";
            }
            app.LastCompany = Required(request.LastCompany, "Last Job Company Name");
            app.LastCity = Required(request.LastCity, "Last Job City");
            app.LastDesignation = Required(request.LastDesignation, "Last Job Designation");
            app.LastDurationMonths = Required(request.LastDurationMonths, "Last Job Duration");
            app.LastProfile = Required(request.LastProfile, "Last Job Profile");
            app.SecondCompany = (request.SecondCompany ?? "").Trim();
            app.SecondCity = (request.SecondCity ?? "").Trim();
            app.SecondDesignation = (request.SecondDesignation ?? "").Trim();
            app.SecondDurationMonths = (request.SecondDurationMonths ?? "").Trim();
            app.SecondProfile = (request.SecondProfile ?? "").Trim();
        }

        private static void ClearEmployment(JobApplication app)
        {
            app.CurrentCompany = "";
            app.CurrentCity = "";
            app.CurrentDesignation = "";
            app.CurrentDurationMonths = "";
            app.CurrentProfile = "";
            app.LastCompany = "";
            app.LastCity = "";
            app.LastDesignation = "";
            app.LastDurationMonths = "";
            app.LastProfile = "";
            app.SecondCompany = "";
            app.SecondCity = "";
            app.SecondDesignation = "";
            app.SecondDurationMonths = "";
            app.SecondProfile = "";
        }

        private void ApplyResume(JobApplication app, CareerStepRequest request, CareerUpload? resume, bool requiredFile)
        {
            if (!CareerCatalog.HeardFrom.Contains(request.HeardFrom ?? ""))
                throw new InvalidOperationException("How did you hear about us is required.");
            if (resume == null && requiredFile && string.IsNullOrWhiteSpace(app.ResumeStoredName))
                throw new InvalidOperationException("Upload Resume is required.");
            if (resume != null)
            {
                SaveUpload(resume, ResumeExt, "resumes", out var stored, out var original);
                app.ResumeStoredName = stored;
                app.ResumeOriginalName = original;
            }
            app.HeardFrom = request.HeardFrom!;
            app.HeardFromNote = (request.HeardFromNote ?? "").Trim();
        }

        private static void ValidateComplete(JobApplication app)
        {
            if (app.CompletedStep < 4 || string.IsNullOrWhiteSpace(app.ResumeStoredName) || string.IsNullOrWhiteSpace(app.PhotoStoredName))
                throw new InvalidOperationException("Complete every step before submitting.");
            if (!app.BirthDate.HasValue || string.IsNullOrWhiteSpace(app.SchoolName) || !app.JoinDays.HasValue)
                throw new InvalidOperationException("Complete every step before submitting.");
        }

        private void SaveUpload(CareerUpload upload, HashSet<string> allowed, string folder, out string stored, out string original)
        {
            if (upload.Length <= 0 || upload.Length > MaxBytes)
                throw new InvalidOperationException("Max. File Size : 5MB");
            var ext = Path.GetExtension(upload.FileName);
            if (!allowed.Contains(ext))
                throw new InvalidOperationException("That file type is not allowed.");
            var root = StorageRoot(folder);
            Directory.CreateDirectory(root);
            stored = $"{Guid.NewGuid():N}{ext.ToLowerInvariant()}";
            original = Path.GetFileName(upload.FileName);
            var path = Path.Combine(root, stored);
            using var file = File.Create(path);
            upload.Content.CopyTo(file);
        }

        private string StorageRoot(string folder) =>
            Path.Combine(_env.ContentRootPath, "App_Data", "careers", folder);

        private async Task<CareerOtp?> LatestOtp(string email, string purpose) =>
            await _db.CareerOtps.Where(o => o.Email == email && o.Purpose == purpose)
                .OrderByDescending(o => o.Id).FirstOrDefaultAsync();

        private async Task<JobApplication?> SubmittedByEmail(string email) =>
            await _db.JobApplications.Include(a => a.Status)
                .FirstOrDefaultAsync(a => a.Email == email && a.IsSubmitted);

        private async Task<JobApplication> RequireDraft(string token)
        {
            if (string.IsNullOrWhiteSpace(token)) throw new InvalidOperationException("Your application session has expired.");
            var app = await _db.JobApplications.FirstOrDefaultAsync(a => a.DraftToken == token && !a.IsSubmitted);
            return app ?? throw new InvalidOperationException("Your application session has expired.");
        }

        private async Task<JobApplication> RequireSubmitted(int id)
        {
            var app = await _db.JobApplications.Include(a => a.Status).FirstOrDefaultAsync(a => a.Id == id && a.IsSubmitted);
            return app ?? throw new InvalidOperationException("Application was not found.");
        }

        private async Task<JobApplication> RequireStatusToken(string token)
        {
            int id;
            try
            {
                var plain = _tokens.Decrypt(token);
                var parts = plain.Split('|');
                if (parts.Length != 3 || parts[0] != "career-status" || !int.TryParse(parts[1], out id))
                    throw new InvalidOperationException("Verify your email again.");
                if (!long.TryParse(parts[2], out var unix) || DateTimeOffset.FromUnixTimeSeconds(unix) < DateTimeOffset.UtcNow)
                    throw new InvalidOperationException("Verify your email again.");
            }
            catch (InvalidOperationException) { throw; }
            catch { throw new InvalidOperationException("Verify your email again."); }

            return await _db.JobApplications.Include(a => a.Status).FirstOrDefaultAsync(a => a.Id == id && a.IsSubmitted)
                ?? throw new InvalidOperationException("It seems you have not applied for the job before.");
        }

        private string IssueStatusToken(int id)
        {
            var exp = DateTimeOffset.UtcNow.AddMinutes(30).ToUnixTimeSeconds();
            return _tokens.Encrypt($"career-status|{id}|{exp}");
        }

        private static void ValidateGate(string? first, string? surname, string email, string? mobile, string? type, string? slug)
        {
            if (!IsLetters(first)) throw new InvalidOperationException("Name is required.");
            if (!IsLetters(surname)) throw new InvalidOperationException("Surname is required.");
            if (!email.Contains('@') || email.Length > 320) throw new InvalidOperationException("Valid Email Address");
            var digits = Digits(mobile);
            if (digits.Length is < 6 or > 12) throw new InvalidOperationException("Mobile Number is required.");
            if (type != "Job" && type != "Internship") throw new InvalidOperationException("Select Job or Internship.");
            if (string.IsNullOrWhiteSpace(slug)) throw new InvalidOperationException("Select a role from the vacancy board.");
        }

        private static string NormalizePurpose(string? purpose) =>
            string.Equals(purpose, "status", StringComparison.OrdinalIgnoreCase) ? "status" : "apply";

        private static string NormalizeEmail(string? email)
        {
            var value = (email ?? "").Trim().ToLowerInvariant();
            if (string.IsNullOrWhiteSpace(value)) throw new InvalidOperationException("Valid Email Address");
            return value;
        }

        private static string NormalizeSet(string? value) =>
            value?.ToLowerInvariant() switch { "old" => "Old", "new" => "New", _ => "All" };

        private static string Required(string? value, string label)
        {
            var text = (value ?? "").Trim();
            if (text.Length == 0) throw new InvalidOperationException($"{label} is required.");
            return text;
        }

        private static string RequireMedium(string? value)
        {
            var text = (value ?? "").Trim();
            if (text is not ("English" or "Gujarati" or "Hindi" or "Others"))
                throw new InvalidOperationException("Medium of School is required.");
            return text;
        }

        private static bool IsLetters(string? value) =>
            !string.IsNullOrWhiteSpace(value) && value.Trim().All(char.IsLetter);

        private static string Digits(string? value) =>
            new string((value ?? "").Where(char.IsDigit).ToArray());

        private static string NewToken() => Convert.ToHexString(RandomNumberGenerator.GetBytes(24));

        private static int AgeYears(DateTime birth)
        {
            var today = DateTime.UtcNow.Date;
            var age = today.Year - birth.Year;
            if (birth.Date > today.AddYears(-age)) age--;
            return age;
        }

        private static string Fmt(DateTime? value) =>
            value.HasValue ? value.Value.ToString("dd-MMM-yyyy", CultureInfo.InvariantCulture) : "";

        private static string ExperienceText(JobApplication app)
        {
            if (app.IsFresher) return "Fresher";
            return $"{app.ExperienceYears} Year(s) {app.ExperienceMonths} Month(s)";
        }

        private static bool CanReplace(JobApplication app) =>
            app.ReapplyAfter == null || app.ReapplyAfter.Value.Date <= DateTime.UtcNow.Date;

        private static string ContentTypeFor(string path) => Path.GetExtension(path).ToLowerInvariant() switch
        {
            ".pdf" => "application/pdf",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".jpg" or ".jpeg" => "image/jpeg",
            ".doc" => "application/msword",
            ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            _ => "application/octet-stream"
        };

        private static CareerDraftDto MapDraft(JobApplication app) => new()
        {
            CompletedStep = app.CompletedStep,
            JobSlug = app.JobSlug,
            JobTitle = app.JobTitle,
            Location = app.Location,
            RegistrationType = app.RegistrationType,
            FirstName = app.FirstName,
            Surname = app.Surname,
            Email = app.Email,
            Mobile = app.Mobile,
            CountryCode = app.CountryCode,
            BirthDate = app.BirthDate?.ToString("yyyy-MM-dd"),
            Gender = app.Gender,
            HasPhoto = !string.IsNullOrWhiteSpace(app.PhotoStoredName),
            SchoolMedium = app.SchoolMedium,
            Facebook = app.Facebook,
            LinkedIn = app.LinkedIn,
            Twitter = app.Twitter,
            SchoolName = app.SchoolName,
            SchoolCity = app.SchoolCity,
            GraduationDegree = app.GraduationDegree,
            GraduationInstitute = app.GraduationInstitute,
            GraduationCity = app.GraduationCity,
            PostGraduationDegree = app.PostGraduationDegree,
            PostGraduationInstitute = app.PostGraduationInstitute,
            PostGraduationCity = app.PostGraduationCity,
            IsFresher = app.IsFresher,
            ExperienceYears = app.ExperienceYears,
            ExperienceMonths = app.ExperienceMonths,
            CurrentlyWorking = app.CurrentlyWorking,
            CurrentCompany = app.CurrentCompany,
            CurrentCity = app.CurrentCity,
            CurrentDesignation = app.CurrentDesignation,
            CurrentDurationMonths = app.CurrentDurationMonths,
            CurrentProfile = app.CurrentProfile,
            LastCompany = app.LastCompany,
            LastCity = app.LastCity,
            LastDesignation = app.LastDesignation,
            LastDurationMonths = app.LastDurationMonths,
            LastProfile = app.LastProfile,
            SecondCompany = app.SecondCompany,
            SecondCity = app.SecondCity,
            SecondDesignation = app.SecondDesignation,
            SecondDurationMonths = app.SecondDurationMonths,
            SecondProfile = app.SecondProfile,
            JoinDays = app.JoinDays,
            HasResume = !string.IsNullOrWhiteSpace(app.ResumeStoredName),
            HeardFrom = app.HeardFrom,
            HeardFromNote = app.HeardFromNote
        };

        private static CareerStatusViewDto MapStatus(JobApplication app) => new()
        {
            Found = true,
            ReferenceCode = app.ReferenceCode,
            Position = app.JobTitle,
            RegistrationType = app.RegistrationType,
            ApplicationUpdated = Fmt(app.UpdatedAt),
            StatusUpdated = Fmt(app.StatusUpdatedAt),
            StatusLabel = app.Status?.ShortLabel ?? "Review Pending",
            StatusDetails = app.Status?.Summary ?? "",
            ReapplyAfter = app.ReapplyAfter.HasValue && app.ReapplyAfter.Value.Date > DateTime.UtcNow.Date ? Fmt(app.ReapplyAfter) : null,
            CanReplaceResume = CanReplace(app) && !string.IsNullOrWhiteSpace(app.ResumeStoredName) || CanReplace(app)
        };

        private static CareerDetailDto MapDetail(JobApplication app)
        {
            var birth = app.BirthDate;
            return new CareerDetailDto
            {
                Id = app.Id,
                JobTitle = app.JobTitle,
                Location = app.Location,
                ReferenceCode = app.ReferenceCode,
                FirstName = app.FirstName,
                Surname = app.Surname,
                BirthDate = Fmt(birth),
                AgeLabel = birth.HasValue ? $"Age {AgeYears(birth.Value)} ({Fmt(birth)})" : "",
                Gender = app.Gender,
                Email = app.Email,
                Mobile = app.Mobile,
                CountryCode = app.CountryCode,
                LinkedIn = app.LinkedIn,
                Facebook = app.Facebook,
                Twitter = app.Twitter,
                HasPhoto = !string.IsNullOrWhiteSpace(app.PhotoStoredName),
                HasResume = !string.IsNullOrWhiteSpace(app.ResumeStoredName),
                ResumeOriginalName = app.ResumeOriginalName,
                OfficeNote = app.OfficeNote,
                IsFresher = app.IsFresher,
                Experience = ExperienceText(app),
                CurrentlyWorking = app.CurrentlyWorking,
                CurrentJob = JobBlock(app.CurrentCompany, app.CurrentCity, app.CurrentDesignation, app.CurrentDurationMonths, app.CurrentProfile),
                LastJob = JobBlock(app.LastCompany, app.LastCity, app.LastDesignation, app.LastDurationMonths, app.LastProfile),
                SecondJob = JobBlock(app.SecondCompany, app.SecondCity, app.SecondDesignation, app.SecondDurationMonths, app.SecondProfile),
                JoinDays = app.JoinDays,
                SchoolName = app.SchoolName,
                SchoolCity = app.SchoolCity,
                SchoolMedium = app.SchoolMedium,
                GraduationDegree = app.GraduationDegree,
                GraduationInstitute = app.GraduationInstitute,
                GraduationCity = app.GraduationCity,
                PostGraduationDegree = app.PostGraduationDegree,
                PostGraduationInstitute = app.PostGraduationInstitute,
                PostGraduationCity = app.PostGraduationCity,
                HeardFrom = app.HeardFrom,
                HeardFromNote = app.HeardFromNote,
                RegistrationType = app.RegistrationType,
                StatusId = app.StatusId,
                StatusLabel = app.Status?.ShortLabel ?? "",
                StatusUpdated = Fmt(app.StatusUpdatedAt),
                IsOldResume = app.IsOldResume,
                IsHidden = app.IsHidden
            };
        }

        private static CareerJobBlockDto? JobBlock(string company, string city, string designation, string duration, string profile)
        {
            if (string.IsNullOrWhiteSpace(company) && string.IsNullOrWhiteSpace(designation)) return null;
            return new CareerJobBlockDto
            {
                Company = company,
                City = city,
                Designation = designation,
                DurationMonths = duration,
                Profile = profile
            };
        }

        private static CareerMassEmailDto MapMass(CareerMassEmail row) => new()
        {
            Id = row.Id,
            Position = row.Position,
            ResumeSet = row.ResumeSet,
            StatusIds = row.StatusIds,
            FromAddress = row.FromAddress,
            Subject = row.Subject,
            HtmlBody = row.HtmlBody,
            State = row.State,
            RecipientCount = row.RecipientCount,
            Error = row.Error,
            CreatedAt = Fmt(row.CreatedAt),
            SentAt = row.SentAt.HasValue ? Fmt(row.SentAt) : null
        };

        private string PublicBase() =>
            (_config["Careers:PublicBaseUrl"] ?? "https://www.dotsandcoms.in").TrimEnd('/');

        private async Task SafeMail(string to, string cc, string replyTo, string? replyName, string subject, string html)
        {
            try
            {
                await _email.SendEmailAsync(to, cc, replyTo, subject, html, replyName);
            }
            catch
            {
                // The application is already stored. A mail failure should not discard it.
            }
        }

        private string OtpHtml(string name, string code) => $@"
<p>Dear {WebUtility.HtmlEncode(name)},</p>
<p>Thank you for applying for a position or internship at Dots and Coms.</p>
<p><strong>Your OTP:</strong> {WebUtility.HtmlEncode(code)}</p>
<p>Please use this code to verify your identity and continue. If you did not request this, you can ignore this email.</p>
<p>Dots and Coms</p>";

        private string CandidateReceivedHtml(JobApplication app) => $@"
<p>Dear {WebUtility.HtmlEncode(app.FirstName)} {WebUtility.HtmlEncode(app.Surname)},</p>
<p>Your application for <strong>{WebUtility.HtmlEncode(app.JobTitle)}</strong> ({WebUtility.HtmlEncode(app.Location)}) has been received.</p>
<p>Application reference code: <strong>{WebUtility.HtmlEncode(app.ReferenceCode)}</strong></p>
<p>Check the status any time at <a href=""{PublicBase()}/check-application-status"">{PublicBase()}/check-application-status</a>.</p>
<p>Dots and Coms</p>";

        private string HrHtml(JobApplication app) => $@"
<p>A new application was submitted.</p>
<ul>
<li>Reference: {WebUtility.HtmlEncode(app.ReferenceCode)}</li>
<li>Name: {WebUtility.HtmlEncode(app.FirstName)} {WebUtility.HtmlEncode(app.Surname)}</li>
<li>Email: {WebUtility.HtmlEncode(app.Email)}</li>
<li>Mobile: {WebUtility.HtmlEncode(app.CountryCode)} {WebUtility.HtmlEncode(app.Mobile)}</li>
<li>Role: {WebUtility.HtmlEncode(app.JobTitle)} ({WebUtility.HtmlEncode(app.Location)})</li>
<li>Type: {WebUtility.HtmlEncode(app.RegistrationType)}</li>
</ul>
<p><a href=""{PublicBase()}/poweradmin/applications/{app.Id}"">Open in Poweradmin</a></p>";

        private static string StatusEmailHtml(JobApplication app, CareerStatus status)
        {
            var reapply = app.ReapplyAfter.HasValue
                ? $"<p>You can re-apply after {Fmt(app.ReapplyAfter)}.</p>"
                : "";
            return $@"
<p>Dear {WebUtility.HtmlEncode(app.FirstName)} {WebUtility.HtmlEncode(app.Surname)},</p>
<p>The status of your resume is updated.</p>
<ul>
<li>Position: {WebUtility.HtmlEncode(app.JobTitle)}</li>
<li>Reference: {WebUtility.HtmlEncode(app.ReferenceCode)}</li>
<li>Application last updated: {Fmt(app.UpdatedAt)}</li>
<li>Status updated on: {Fmt(app.StatusUpdatedAt)}</li>
<li>Status: {WebUtility.HtmlEncode(status.ShortLabel)}</li>
</ul>
<p>{WebUtility.HtmlEncode(status.Summary)}</p>
{reapply}";
        }
    }
}
