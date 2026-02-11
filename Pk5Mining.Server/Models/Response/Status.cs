namespace Pk5Mining.Server.Models.Response
{
    public class Status
    {
        public static string SUCCESS = "SUCCESS";
        public static string PARTIAL_SUCCESS = "PARTIAL_SUCCESS";
        public static string FAIL = "FAILURE";


        // Errors
        public static string INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
        public static string UNKNOWN_ERROR = "UNKNOWN_ERROR";
        public static string NOT_FOUND_ERROR = "NOT_FOUND_ERROR";
        public static string ERROR = "ERROR";
        public static string CONFLICT_ERROR = "CONFLICT_ERROR";
        public static string AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR";
        public static string AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
    }
}
