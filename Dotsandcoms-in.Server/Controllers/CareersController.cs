using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Models;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/careers")]
    public class CareersController : ControllerBase
    {
        private readonly ICareerService _careers;
        private readonly IAdminAuthService _auth;
        private readonly IJobPositionService _positions;

        public CareersController(ICareerService careers, IAdminAuthService auth, IJobPositionService positions)
        {
            _careers = careers;
            _auth = auth;
            _positions = positions;
        }

        [HttpPost("otp")]
        public Task<IActionResult> SendOtp([FromBody] CareerOtpRequest request) =>
            Run(() => _careers.SendOtpAsync(request), () => Ok(new { success = true }));

        [HttpPost("otp/resend")]
        public Task<IActionResult> Resend([FromBody] CareerOtpRequest request) =>
            Run(() => _careers.ResendOtpAsync(request.Email, request.Purpose), () => Ok(new { success = true }));

        [HttpPost("otp/reveal")]
        public Task<IActionResult> Reveal([FromBody] CareerOtpRequest request) =>
            Run(async () =>
            {
                var code = await _careers.RevealOtpAsync(request.Email, request.Purpose);
                return Ok(new { success = true, code, message = "Try using this OTP, or attempt again later." });
            });

        [HttpPost("otp/verify")]
        public Task<IActionResult> Verify([FromBody] CareerVerifyRequest request) =>
            Run(async () => Ok(new { success = true, data = await _careers.VerifyOtpAsync(request) }));

        [HttpGet("draft")]
        public Task<IActionResult> Draft() =>
            Run(async () => Ok(new { success = true, data = await _careers.GetDraftAsync(DraftToken()) }));

        [HttpPost("draft/step")]
        [RequestSizeLimit(12_000_000)]
        public Task<IActionResult> SaveStep([FromForm] int step, [FromForm] CareerStepRequest request) =>
            Run(async () =>
            {
                var photo = await ReadUpload(Request.Form.Files.GetFile("photo"));
                var resume = await ReadUpload(Request.Form.Files.GetFile("resume"));
                await _careers.SaveStepAsync(DraftToken(), step, request, photo, resume);
                return Ok(new { success = true });
            });

        [HttpPost("draft/submit")]
        public Task<IActionResult> Submit() =>
            Run(async () => Ok(new { success = true, data = await _careers.SubmitAsync(DraftToken()) }));

        [HttpGet("status")]
        public Task<IActionResult> Status([FromQuery] string token) =>
            Run(async () => Ok(new { success = true, data = await _careers.GetStatusAsync(token) }));

        [HttpPost("status/resume")]
        [RequestSizeLimit(8_000_000)]
        public Task<IActionResult> ReplaceResume([FromForm] string token) =>
            Run(async () =>
            {
                var resume = await ReadUpload(Request.Form.Files.GetFile("resume"));
                if (resume == null) throw new InvalidOperationException("Upload Resume is required.");
                await _careers.ReplaceResumeAsync(token, resume);
                return Ok(new { success = true });
            });

        [HttpGet("admin/applications")]
        public Task<IActionResult> List([FromQuery] CareerListQuery query) =>
            Admin(async () => Ok(new { success = true, data = await _careers.ListAsync(query) }));

        [HttpGet("admin/applications/{id:int}")]
        public Task<IActionResult> Detail(int id) =>
            Admin(async () =>
            {
                var row = await _careers.GetDetailAsync(id);
                return row == null ? NotFound(new { success = false, message = "Application was not found." }) : Ok(new { success = true, data = row });
            });

        [HttpGet("admin/applications/{id:int}/file/{kind}")]
        public Task<IActionResult> File(int id, string kind) =>
            Admin(async () =>
            {
                if (kind is not ("photo" or "resume")) return BadRequest();
                var opened = await _careers.OpenFileAsync(id, kind);
                if (opened == null) return NotFound();
                return File(opened.Value.Stream, opened.Value.ContentType, opened.Value.FileName);
            });

        [HttpPost("admin/applications/{id:int}/note")]
        public Task<IActionResult> Note(int id, [FromBody] NoteBody body) =>
            Admin(() => _careers.SaveNoteAsync(id, body.Note ?? ""), () => Ok(new { success = true }));

        [HttpPost("admin/applications/{id:int}/status")]
        public Task<IActionResult> StatusChange(int id, [FromBody] CareerStatusChangeRequest request) =>
            Admin(async () => Ok(new { success = true, data = await _careers.ChangeStatusAsync(id, request) }));

        [HttpPost("admin/applications/{id:int}/hide")]
        public Task<IActionResult> Hide(int id) =>
            Admin(() => _careers.HideAsync(id), () => Ok(new { success = true, message = "Resume has been successfully deleted." }));

        [HttpGet("admin/statuses")]
        public Task<IActionResult> Statuses([FromQuery] bool radioOnly = false) =>
            Admin(async () => Ok(new { success = true, data = await _careers.StatusOptionsAsync(radioOnly) }));

        [HttpGet("positions")]
        public Task<IActionResult> PublicPositions() =>
            Run(async () => Ok(new { success = true, data = await _positions.GetPublicCardsAsync() }));

        [HttpGet("positions/{slug}")]
        public Task<IActionResult> PublicPosition(string slug) =>
            Run(async () =>
            {
                var job = await _positions.GetPublicBySlugAsync(slug);
                if (job == null) return NotFound(new { success = false, message = "Position not found." });
                return Ok(new { success = true, data = job });
            });

        [HttpGet("admin/positions")]
        public Task<IActionResult> Positions() =>
            Admin(async () =>
            {
                var rows = await _positions.GetAdminListAsync();
                return Ok(new
                {
                    success = true,
                    data = rows.Select(j => new { slug = j.Slug, title = j.PageHeading, location = j.Location })
                });
            });

        [HttpGet("admin/vacancies")]
        public Task<IActionResult> VacancyList() =>
            Admin(async () => Ok(new { success = true, data = await _positions.GetAdminListAsync() }));

        [HttpGet("admin/vacancies/{id:int}")]
        public Task<IActionResult> VacancyDetail(int id) =>
            Admin(async () =>
            {
                var row = await _positions.GetAdminByIdAsync(id);
                if (row == null) return NotFound(new { success = false, message = "Position not found." });
                return Ok(new { success = true, data = row });
            });

        [HttpPost("admin/vacancies")]
        public Task<IActionResult> VacancyCreate([FromBody] JobPositionWriteDto dto) =>
            Admin(async () => Ok(new { success = true, data = await _positions.CreateAsync(dto) }));

        [HttpPut("admin/vacancies/{id:int}")]
        public Task<IActionResult> VacancyUpdate(int id, [FromBody] JobPositionWriteDto dto) =>
            Admin(async () =>
            {
                var row = await _positions.UpdateAsync(id, dto);
                if (row == null) return NotFound(new { success = false, message = "Position not found." });
                return Ok(new { success = true, data = row });
            });

        [HttpPut("admin/vacancies/{id:int}/flags")]
        public Task<IActionResult> VacancyFlags(int id, [FromBody] JobPositionFlagsDto flags) =>
            Admin(async () =>
            {
                var saved = await _positions.UpdateFlagsAsync(id, flags);
                if (!saved) return NotFound(new { success = false, message = "Position not found." });
                return Ok(new { success = true });
            });

        [HttpDelete("admin/vacancies/{id:int}")]
        public Task<IActionResult> VacancyDelete(int id) =>
            Admin(async () =>
            {
                var deleted = await _positions.DeleteAsync(id);
                if (!deleted) return NotFound(new { success = false, message = "Position not found." });
                return Ok(new { success = true });
            });

        [HttpPost("admin/vacancies/image")]
        [RequestSizeLimit(3_000_000)]
        public Task<IActionResult> VacancyImage() =>
            Admin(async () =>
            {
                var file = Request.Form.Files.GetFile("file");
                if (file == null || file.Length == 0) throw new InvalidOperationException("Choose an image.");
                var url = await _positions.SaveImageAsync(file, Request.Form["kind"].ToString());
                return Ok(new { success = true, data = new { url } });
            });

        [HttpGet("admin/mass-email")]
        public Task<IActionResult> MassList([FromQuery] string? state) =>
            Admin(async () => Ok(new { success = true, data = await _careers.ListMassEmailsAsync(state) }));

        [HttpPost("admin/mass-email")]
        public Task<IActionResult> MassCreate([FromBody] CareerMassEmailRequest request) =>
            Admin(async () => Ok(new { success = true, data = await _careers.CreateMassEmailAsync(request) }));

        [HttpPost("admin/mass-email/{id:int}/send")]
        public Task<IActionResult> MassSend(int id) =>
            Admin(async () => Ok(new { success = true, data = await _careers.SendMassEmailAsync(id) }));

        [HttpPost("admin/mass-email/{id:int}/cancel")]
        public Task<IActionResult> MassCancel(int id) =>
            Admin(() => _careers.CancelMassEmailAsync(id), () => Ok(new { success = true }));

        public class NoteBody { public string? Note { get; set; } }

        private string DraftToken() => Request.Headers["X-Draft-Token"].FirstOrDefault() ?? "";

        private bool TryAdmin(out IActionResult? failure)
        {
            var header = Request.Headers.Authorization.FirstOrDefault();
            if (string.IsNullOrWhiteSpace(header) || !header.StartsWith("Bearer "))
            {
                failure = Unauthorized(new { success = false, message = "Authorization token is required." });
                return false;
            }
            try
            {
                _auth.ValidateToken(header["Bearer ".Length..].Trim());
                failure = null;
                return true;
            }
            catch (InvalidOperationException ex)
            {
                failure = Unauthorized(new { success = false, message = ex.Message });
                return false;
            }
        }

        private async Task<IActionResult> Admin(Func<Task<IActionResult>> action)
        {
            if (!TryAdmin(out var failure)) return failure!;
            try { return await action(); }
            catch (InvalidOperationException ex) { return BadRequest(new { success = false, message = ex.Message }); }
        }

        private Task<IActionResult> Admin(Func<Task> action, Func<IActionResult> ok) =>
            Admin(async () => { await action(); return ok(); });

        private async Task<IActionResult> Run(Func<Task> action, Func<IActionResult> ok)
        {
            try { await action(); return ok(); }
            catch (InvalidOperationException ex) { return BadRequest(new { success = false, message = ex.Message }); }
        }

        private async Task<IActionResult> Run(Func<Task<IActionResult>> action)
        {
            try { return await action(); }
            catch (InvalidOperationException ex) { return BadRequest(new { success = false, message = ex.Message }); }
        }

        private static async Task<CareerUpload?> ReadUpload(IFormFile? file)
        {
            if (file == null || file.Length == 0) return null;
            var buffer = new MemoryStream();
            await file.CopyToAsync(buffer);
            buffer.Position = 0;
            return new CareerUpload(buffer, file.FileName, file.Length);
        }
    }
}
