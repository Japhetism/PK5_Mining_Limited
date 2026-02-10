namespace Pk5Mining.Server.Services
{
    public static class IdGenerator
    {
        private static readonly Random _random = new Random();

        public static long GenerateUniqueId()
        {
            DateTime now = DateTime.Now;
            string idString = $"{now.Minute:D2}{now.Second:D2}{now.Hour:D2}{now.Millisecond:D3}{_random.Next(100, 999)}";
            return long.Parse(idString);
        }
    }
}