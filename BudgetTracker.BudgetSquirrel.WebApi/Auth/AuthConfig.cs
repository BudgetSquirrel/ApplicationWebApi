namespace BudgetTracker.BudgetSquirrel.WebApi.Auth
{
    public class AuthConfig
    {
        public string JWTSecurityKey { get; set; }
        public string JWTAudience { get; set; } = "BudgetSquirrel_Users";
        public string JWTIssuer { get; set; } = "BudgetSquirrel";
        public int JWTDuration { get; set; } = 12;
    }
}