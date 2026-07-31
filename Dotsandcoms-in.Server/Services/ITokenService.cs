namespace Dotsandcoms_in.Server.Services
{
    public interface ITokenService
    {
        string Encrypt(string plainText);
        string Decrypt(string cipherText);

    }
}
