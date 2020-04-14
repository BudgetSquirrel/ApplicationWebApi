using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Api.Services.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using Microsoft.EntityFrameworkCore;
using BudgetSquirrel.Data.EntityFramework.Models;
using System.Security.Claims;
using BudgetSquirrel.Api.Helpers;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;

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
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(user.CreateUserClaims(), CookieAuthenticationDefaults.AuthenticationScheme);

            await this.httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties { IsPersistent = true });
        }
    }
}