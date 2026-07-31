namespace Dotsandcoms_in.Server.Services
{
    public interface ILegacyTokenService
    {
        string Encrypt(string plainText);

        string Decrypt(string token);
    }
}
