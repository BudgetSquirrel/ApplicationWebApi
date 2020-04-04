using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework.Models;

namespace BudgetSquirrel.Api.Helpers
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
        public static List<Claim> CreateUserClaims(this UserRecord user)	
        {	
            var claims = new List<Claim>	
            {
                new Claim(userIdClaimType, user.Id.ToString())
            };

            return claims;	
        }	

        /// <summary>	
        /// Will get base User data from the cookie we can correctly retrieve their	
        /// data from the database	
        /// </summary>	
        /// <param name="userClaims">The list of user claims attached to the cookie</param>	
        /// <returns>The user with base user data</returns>	
        public static Guid GetUserIdFromClaims(this IEnumerable<Claim> userClaims)	
        {
            return Guid.Parse(userClaims.FirstOrDefault(x => x.Type == userIdClaimType)?.Value);
        }	
    }	
} 