using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Api.Services.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using Microsoft.EntityFrameworkCore;
using BudgetSquirrel.Data.EntityFramework.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using BudgetSquirrel.Business.Auth;
using System.Collections.Generic;
using System;
using System.Linq;
using BudgetSquirrel.Data.EntityFramework.Converters;

namespace BudgetSquirrel.Api.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly BudgetSquirrelContext dbConext;
        private readonly ICryptor cryptor;
        private readonly GateKeeperConfig gateKeeperConfig;
        private readonly IHttpContextAccessor httpContextAccessor;

        public AuthService(BudgetSquirrelContext dbConext, ICryptor cryptor, GateKeeperConfig gateKeeperConfig, IHttpContextAccessor httpContextAccessor)
        {
            this.dbConext = dbConext;
            this.cryptor = cryptor;
            this.gateKeeperConfig = gateKeeperConfig;
            this.httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Returns the current user that is signed into the application. If no user is signed in or their
        /// user information could not be found, an InvalidOperationException is thrown with a message
        /// spefying what went wrong.
        /// </summary>
        public async Task<User> GetCurrentUser()
        {
            Guid userId = GetUserIdFromClaims(this.httpContextAccessor.HttpContext.User.Claims);
            if (userId == null)
                throw new InvalidOperationException("Not authenticated");
            UserRecord userData = await this.dbConext.Users.FindAsync(userId);
            if (userData == null)
                throw new InvalidOperationException($"No user with id {userId} could be found");
            
            User user = UserConverter.ToDomainModel(userData);
            return user;
        }

        public async Task<UserRecord> Authenticate(LoginRequest credentials)
        {
            UserRecord user = await this.dbConext.Users.SingleOrDefaultAsync(x => x.Username == credentials.Username);

            if (user != null)
            {
                string encryptedGuessedPassword = this.cryptor.Encrypt(credentials.Password, this.gateKeeperConfig.EncryptionKey, this.gateKeeperConfig.Salt);
                if (user.Password != encryptedGuessedPassword)
                    user = null;
            }
            return user;
        }

        public async Task SignInAsync(UserRecord user)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(CreateUserClaims(user), CookieAuthenticationDefaults.AuthenticationScheme);

            await this.httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties { IsPersistent = true });
        }

        /// <summary>	
        /// Is an extension method on the user class <see cref="User"/>	
        /// will set up the claims to be added to the cookie so we can 	
        /// get user data in other requests <see cref="GetUserFromClaims"/>	
        /// </summary>	
        /// <param name="user">Extension method on the user</param>	
        /// <returns>A list of claims to be added to the cookie</returns>	
        private List<Claim> CreateUserClaims(UserRecord user)	
        {	
            var claims = new List<Claim>	
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            return claims;	
        }	

        /// <summary>	
        /// Will get base User data from the cookie we can correctly retrieve their	
        /// data from the database	
        /// </summary>	
        /// <param name="userClaims">The list of user claims attached to the cookie</param>	
        /// <returns>The user with base user data</returns>	
        private Guid GetUserIdFromClaims(IEnumerable<Claim> userClaims)	
        {
            return Guid.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
        }
    }
}