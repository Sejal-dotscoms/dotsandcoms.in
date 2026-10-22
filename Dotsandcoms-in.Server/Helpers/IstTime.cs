namespace Dotsandcoms_in.Server.Helpers
{
    /// <summary>
    /// India Standard Time (UTC+5:30, no DST). Persist timestamps as UTC;
    /// use this for calendar-day logic and anything a person in India reads.
    /// </summary>
    public static class IstTime
    {
        public static readonly TimeZoneInfo Zone = Resolve();

        public static DateTime Now => TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, Zone);

        public static DateTime Today => Now.Date;

        /// <summary>
        /// Values from SQL are usually <see cref="DateTimeKind.Unspecified"/> even when
        /// the clock was UTC at write time. Treat Unspecified as UTC.
        /// </summary>
        public static DateTime ToIst(DateTime value)
        {
            var utc = value.Kind switch
            {
                DateTimeKind.Utc => value,
                DateTimeKind.Local => value.ToUniversalTime(),
                _ => DateTime.SpecifyKind(value, DateTimeKind.Utc)
            };
            return TimeZoneInfo.ConvertTimeFromUtc(utc, Zone);
        }

        public static DateTime? ToIst(DateTime? value) =>
            value.HasValue ? ToIst(value.Value) : null;

        private static TimeZoneInfo Resolve()
        {
            try
            {
                return TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            }
            catch (TimeZoneNotFoundException)
            {
                return TimeZoneInfo.FindSystemTimeZoneById("Asia/Kolkata");
            }
        }
    }
}
