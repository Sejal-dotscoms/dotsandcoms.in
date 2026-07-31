using Dotsandcoms_in.Server.DTOs;

namespace Dotsandcoms_in.Server.Services
{
    public interface IOrderService
    {
        Task<(string OrderRef, string Token)> PlaceOrderAsync(OrderRequestDto dto, string ipAddress);
        OrderTokenPayload DecodeToken(string token);
        string BuildCcavenueRedirectToken(string token, out string orderRef);
    }
}
