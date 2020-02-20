using System.Collections.Generic;
using System.Security.Claims;
using BudgetTracker.Business.Auth;

namespace BudgetTracker.BudgetSquirrel.WebApi.Auth
{
    public static class ClaimsHelper
    {
        public static List<Claim> CreateUserClaims(this User user)
        {
            return new List<Claim>
            {

            };
        }
    }
}