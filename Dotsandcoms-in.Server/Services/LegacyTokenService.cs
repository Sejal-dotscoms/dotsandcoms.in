using System.Security.Cryptography;
using System.Text;

namespace Dotsandcoms_in.Server.Services
{
    public class LegacyTokenService :ILegacyTokenService
    {
        private static readonly byte[] EncryptionKey =
           Convert.FromBase64String("hW7B3oKhpCJtHfKx2aYVbr3GmTJSftgcHrB5n7vTmbA=");

        private static readonly byte[] HmacKey =
            Convert.FromBase64String("mXqC9FkgqkFf1fIL2kDblx1b8YoHUlSwPT0VPl+9BKU=");

        public string Encrypt(string plainText)
        {
            using var aes = Aes.Create();
            aes.Key = EncryptionKey;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;
            aes.GenerateIV();

            using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            var plainBytes = Encoding.UTF8.GetBytes(plainText);
            var cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

            var ivAndCipher = new byte[aes.IV.Length + cipherBytes.Length];
            Buffer.BlockCopy(aes.IV, 0, ivAndCipher, 0, aes.IV.Length);
            Buffer.BlockCopy(cipherBytes, 0, ivAndCipher, aes.IV.Length, cipherBytes.Length);

            using var hmac = new HMACSHA256(HmacKey);
            var tag = hmac.ComputeHash(ivAndCipher);

            var tokenBytes = new byte[ivAndCipher.Length + tag.Length];
            Buffer.BlockCopy(ivAndCipher, 0, tokenBytes, 0, ivAndCipher.Length);
            Buffer.BlockCopy(tag, 0, tokenBytes, ivAndCipher.Length, tag.Length);

            return Base64UrlEncode(tokenBytes);
        }

        public string Decrypt(string token)
        {
            var tokenBytes = Base64UrlDecode(token);
            if (tokenBytes.Length < 48) throw new ArgumentException("Invalid token");

            var iv = new byte[16];
            Buffer.BlockCopy(tokenBytes, 0, iv, 0, 16);

            var hmacTag = new byte[32];
            Buffer.BlockCopy(tokenBytes, tokenBytes.Length - 32, hmacTag, 0, 32);

            var cipher = new byte[tokenBytes.Length - 48];
            Buffer.BlockCopy(tokenBytes, 16, cipher, 0, cipher.Length);

            using var hmacSha = new HMACSHA256(HmacKey);
            var ivAndCipher = new byte[16 + cipher.Length];
            Buffer.BlockCopy(iv, 0, ivAndCipher, 0, 16);
            Buffer.BlockCopy(cipher, 0, ivAndCipher, 16, cipher.Length);
            var expectedHmac = hmacSha.ComputeHash(ivAndCipher);

            if (!CryptographicOperations.FixedTimeEquals(hmacTag, expectedHmac))
                throw new CryptographicException("Invalid HMAC - token tampered");

            using var aes = Aes.Create();
            aes.Key = EncryptionKey;
            aes.IV = iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
            var plainBytes = decryptor.TransformFinalBlock(cipher, 0, cipher.Length);

            return Encoding.UTF8.GetString(plainBytes);
        }

        private static string Base64UrlEncode(byte[] input)
        {
            var base64 = Convert.ToBase64String(input);
            return base64.Replace("+", "-").Replace("/", "_").TrimEnd('=');
        }

        private static byte[] Base64UrlDecode(string input)
        {
            var s = input.Replace("-", "+").Replace("_", "/");
            switch (s.Length % 4)
            {
                case 2: s += "=="; break;
                case 3: s += "="; break;
            }
            return Convert.FromBase64String(s);
        }
    }
}
