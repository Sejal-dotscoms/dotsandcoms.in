namespace Dotsandcoms_in.Server.Helpers
{
    public static class ImageSize
    {
        public static bool TryGet(ReadOnlySpan<byte> data, out int width, out int height)
        {
            width = 0;
            height = 0;
            if (IsPng(data))
            {
                width = ReadBe(data, 16);
                height = ReadBe(data, 20);
                return width > 0 && height > 0;
            }
            if (IsGif(data))
            {
                width = data[6] | (data[7] << 8);
                height = data[8] | (data[9] << 8);
                return width > 0 && height > 0;
            }
            if (IsWebp(data)) return TryWebp(data, out width, out height);
            if (data.Length >= 4 && data[0] == 0xFF && data[1] == 0xD8) return TryJpeg(data, out width, out height);
            return false;
        }

        private static bool IsPng(ReadOnlySpan<byte> data) =>
            data.Length >= 24 && data[0] == 0x89 && data[1] == 0x50 && data[2] == 0x4E && data[3] == 0x47;

        private static bool IsGif(ReadOnlySpan<byte> data) =>
            data.Length >= 10 && data[0] == (byte)'G' && data[1] == (byte)'I' && data[2] == (byte)'F';

        private static bool IsWebp(ReadOnlySpan<byte> data) =>
            data.Length >= 30
            && data[0] == (byte)'R' && data[1] == (byte)'I' && data[2] == (byte)'F' && data[3] == (byte)'F'
            && data[8] == (byte)'W' && data[9] == (byte)'E' && data[10] == (byte)'B' && data[11] == (byte)'P';

        private static bool TryWebp(ReadOnlySpan<byte> data, out int width, out int height)
        {
            width = 0;
            height = 0;
            if (Chunk(data, "VP8X") && data.Length >= 30)
            {
                width = 1 + data[24] + (data[25] << 8) + (data[26] << 16);
                height = 1 + data[27] + (data[28] << 8) + (data[29] << 16);
                return width > 0 && height > 0;
            }
            if (Chunk(data, "VP8 ") && data.Length >= 30 && data[23] == 0x9D && data[24] == 0x01 && data[25] == 0x2A)
            {
                width = (data[26] | (data[27] << 8)) & 0x3FFF;
                height = (data[28] | (data[29] << 8)) & 0x3FFF;
                return width > 0 && height > 0;
            }
            if (Chunk(data, "VP8L") && data.Length >= 25 && data[20] == 0x2F)
            {
                var bits = (uint)data[21] | ((uint)data[22] << 8) | ((uint)data[23] << 16) | ((uint)data[24] << 24);
                width = (int)(bits & 0x3FFF) + 1;
                height = (int)((bits >> 14) & 0x3FFF) + 1;
                return width > 0 && height > 0;
            }
            return false;
        }

        private static bool TryJpeg(ReadOnlySpan<byte> data, out int width, out int height)
        {
            width = 0;
            height = 0;
            var i = 2;
            while (i + 1 < data.Length)
            {
                if (data[i] != 0xFF) return false;
                while (i < data.Length && data[i] == 0xFF) i++;
                if (i >= data.Length) return false;
                var marker = data[i++];
                if (marker == 0xD8 || marker == 0xD9) continue;
                if (marker >= 0xD0 && marker <= 0xD7) continue;
                if (i + 1 >= data.Length) return false;
                var length = ReadBe16(data, i);
                if (length < 2 || i + length > data.Length) return false;
                if (IsJpegFrame(marker) && length >= 7)
                {
                    height = ReadBe16(data, i + 3);
                    width = ReadBe16(data, i + 5);
                    return width > 0 && height > 0;
                }
                if (marker == 0xDA) return false;
                i += length;
            }
            return false;
        }

        private static bool IsJpegFrame(byte marker) =>
            marker is 0xC0 or 0xC1 or 0xC2 or 0xC3 or 0xC5 or 0xC6 or 0xC7
                or 0xC9 or 0xCA or 0xCB or 0xCD or 0xCE or 0xCF;

        private static bool Chunk(ReadOnlySpan<byte> data, string name) =>
            data.Length >= 16 && data[12] == (byte)name[0] && data[13] == (byte)name[1] && data[14] == (byte)name[2] && data[15] == (byte)name[3];

        private static int ReadBe(ReadOnlySpan<byte> data, int offset)
        {
            var value = ((uint)data[offset] << 24) | ((uint)data[offset + 1] << 16) | ((uint)data[offset + 2] << 8) | data[offset + 3];
            return value > int.MaxValue ? 0 : (int)value;
        }

        private static int ReadBe16(ReadOnlySpan<byte> data, int offset) =>
            (data[offset] << 8) | data[offset + 1];
    }
}
