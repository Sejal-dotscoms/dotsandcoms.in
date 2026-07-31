using System.Text.Json.Serialization;

namespace Dotsandcoms_in.Server.Models
{
    public class GoogleCaptchaResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }

        [JsonPropertyName("score")]
        public decimal Score { get; set; }

        [JsonPropertyName("action")]
        public string Action { get; set; }

        [JsonPropertyName("challenge_ts")]
        public string ChallengeTime { get; set; }

        [JsonPropertyName("hostname")]
        public string HostName { get; set; }

    }
}
