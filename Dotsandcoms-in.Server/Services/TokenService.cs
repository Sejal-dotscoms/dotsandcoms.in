using System.Security.Cryptography;
using System.Text;

namespace Dotsandcoms_in.Server.Services
{
    public class TokenService : ITokenService
    {
        private readonly byte[] _key;

        public TokenService(IConfiguration config)
        {
            var keyString = config["TokenEncryption:Key"]
                ?? throw new InvalidOperationException("TokenEncryption:Key missing in appsettings.json");

            using var sha256 = SHA256.Create();
            _key = sha256.ComputeHash(Encoding.UTF8.GetBytes(keyString)); // always 32 bytes -> AES-256
        }

        public string Encrypt(string plainText)
        {
            using var aes = Aes.Create();
            aes.Key = _key;
            aes.GenerateIV();

            using var encryptor = aes.CreateEncryptor();
            var plainBytes = Encoding.UTF8.GetBytes(plainText);
            var cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

            // IV ko cipher ke saath prepend karte hai taaki decrypt time pe mil jaye
            var result = new byte[aes.IV.Length + cipherBytes.Length];
            Buffer.BlockCopy(aes.IV, 0, result, 0, aes.IV.Length);
            Buffer.BlockCopy(cipherBytes, 0, result, aes.IV.Length, cipherBytes.Length);

            return UrlSafeBase64Encode(result);
        }

        public string Decrypt(string cipherText)
        {
            var fullBytes = UrlSafeBase64Decode(cipherText);

            using var aes = Aes.Create();
            aes.Key = _key;

            var iv = new byte[16];
            var cipherBytes = new byte[fullBytes.Length - 16];
            Buffer.BlockCopy(fullBytes, 0, iv, 0, 16);
            Buffer.BlockCopy(fullBytes, 16, cipherBytes, 0, cipherBytes.Length);

            aes.IV = iv;
            using var decryptor = aes.CreateDecryptor();
            var plainBytes = decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
            return Encoding.UTF8.GetString(plainBytes);
        }

        private static string UrlSafeBase64Encode(byte[] data) =>
            Convert.ToBase64String(data).Replace('+', '-').Replace('/', '_').TrimEnd('=');

        private static byte[] UrlSafeBase64Decode(string data)
        {
            var s = data.Replace('-', '+').Replace('_', '/');
            switch (s.Length % 4)
            {
                case 2: s += "=="; break;
                case 3: s += "="; break;
            }
            return Convert.FromBase64String(s);
        }
    }
}
