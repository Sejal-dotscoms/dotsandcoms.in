using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService) => _orderService = orderService;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] OrderRequestDto dto)
        {
            if (dto == null)
                return BadRequest(new { success = false, message = "Invalid order data." });

            var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "-";
            try
            {
                var (orderRef, token) = await _orderService.PlaceOrderAsync(dto, ip);
                return Ok(new { success = true, orderId = orderRef, token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Order failed", error = ex.Message });
            }
        }

        [HttpGet("details")]
        public IActionResult GetDetails([FromQuery] string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                return BadRequest(new { success = false, message = "Token is required." });

            try
            {
                var data = _orderService.DecodeToken(token);
                return Ok(new { success = true, data });
            }
            catch
            {
                return BadRequest(new { success = false, message = "Invalid or expired order link." });
            }
        }

        [HttpPost("payment")]
        public IActionResult SubmitPayment([FromBody] PaymentSubmitDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Token))
                return BadRequest(new { success = false, message = "Invalid request." });

            try
            {
                var legacyToken = _orderService.BuildCcavenueRedirectToken(dto.Token, out var orderRef);
                var redirectUrl = "https://www.dotsandcoms.us/customer-payment.aspx?data=" + Uri.EscapeDataString(legacyToken);
                return Ok(new { success = true, orderId = orderRef, redirectUrl });
            }
            catch
            {
                return BadRequest(new { success = false, message = "Invalid or expired order link." });
            }
        }
    }
}
