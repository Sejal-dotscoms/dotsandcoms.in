using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Services
{
    public interface ICareerService
    {
        Task SendOtpAsync(CareerOtpRequest request);
        Task ResendOtpAsync(string email, string purpose);
        Task<string> RevealOtpAsync(string email, string purpose);
        Task<CareerVerifyResult> VerifyOtpAsync(CareerVerifyRequest request);
        Task<CareerDraftDto> GetDraftAsync(string draftToken);
        Task SaveStepAsync(string draftToken, int step, CareerStepRequest request, CareerUpload? photo, CareerUpload? resume);
        Task<CareerSubmitResult> SubmitAsync(string draftToken);
        Task<CareerStatusViewDto> GetStatusAsync(string statusToken);
        Task ReplaceResumeAsync(string statusToken, CareerUpload resume);

        Task<CareerListResult> ListAsync(CareerListQuery query);
        Task<CareerDetailDto?> GetDetailAsync(int id);
        Task<(Stream Stream, string FileName, string ContentType)?> OpenFileAsync(int id, string kind);
        Task SaveNoteAsync(int id, string note);
        Task<CareerStatusChangeResult> ChangeStatusAsync(int id, CareerStatusChangeRequest request);
        Task HideAsync(int id);
        Task<IReadOnlyList<CareerStatusOptionDto>> StatusOptionsAsync(bool radioOnly);

        Task<CareerMassEmailDto> CreateMassEmailAsync(CareerMassEmailRequest request);
        Task<IReadOnlyList<CareerMassEmailDto>> ListMassEmailsAsync(string? state);
        Task<CareerMassEmailDto> SendMassEmailAsync(int id);
        Task CancelMassEmailAsync(int id);
    }

    public record CareerUpload(Stream Content, string FileName, long Length);
}
