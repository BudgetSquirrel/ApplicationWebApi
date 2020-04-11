using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Api.Services.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;
using Microsoft.EntityFrameworkCore;
using BudgetSquirrel.Data.EntityFramework.Models;

namespace BudgetSquirrel.Api.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly BudgetSquirrelContext dbConext;
        private readonly ICryptor cryptor;
        private readonly GateKeeperConfig gateKeeperConfig;

        public AuthService(BudgetSquirrelContext dbConext, ICryptor cryptor, GateKeeperConfig gateKeeperConfig)
        {
            this.dbConext = dbConext;
            this.cryptor = cryptor;
            this.gateKeeperConfig = gateKeeperConfig;
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
    }
}