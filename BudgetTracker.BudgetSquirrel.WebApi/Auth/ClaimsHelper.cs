using System.Collections.Generic;
using System.Security.Claims;
using System.Linq;
using BudgetTracker.Business.Auth;
using System;

namespace BudgetSquirrel.Api.Auth
{
    public static class ClaimsHelper
    {
        //https://docs.microsoft.com/en-us/dotnet/framework/wcf/extending/how-to-create-a-custom-claim
        const string userIdClaimType = "http://example.org/claims/userId";

        /// <summary>
        /// Is an extension method on the user class <see cref="User"/>
        /// will set up the claims to be added to the cookie so we can 
        /// get user data in other requests <see cref="GetUserFromClaims"/>
        /// </summary>
        /// <param name="user">Extension method on the user</param>
        /// <returns>A list of claims to be added to the cookie</returns>
        public static List<Claim> CreateUserClaims(this User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(userIdClaimType, user.Id.ToString())
            };

            // maybe look to add in some of the createdDate / deletedDate in here

            return claims;
        }

        /// <summary>
        /// Will get base User data from the cookie we can correctly retrieve their
        /// data from the database
        /// </summary>
        /// <param name="userClaims">The list of user claims attached to the cookie</param>
        /// <returns>The user with base user data</returns>
        public static User GetUserFromClaims(this IEnumerable<Claim> userClaims)
        {
            var user = new User();

            string name = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
            user.FirstName = name.Substring(0, name.IndexOf(""));
            user.LastName = name.Substring(1, name.IndexOf(""));

            user.Id = Guid.Parse(userClaims.FirstOrDefault(x => x.Type == userIdClaimType)?.Value);
            user.Email = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            user.Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            // We don't need to return the Password
            return user;
        }
    }
}