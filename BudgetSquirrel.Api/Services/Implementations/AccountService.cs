using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework.Models;
using BudgetSquirrel.Data.EntityFramework.Repositories.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;

namespace BudgetSquirrel.Api.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository userRepository;

        private readonly ICryptor cryptor;
        private GateKeeperConfig gateKeeperConfig;

        public AccountService(IUserRepository userRepository, ICryptor cryptor, GateKeeperConfig gateKeeperConfig)
        {
            this.userRepository = userRepository;
            this.cryptor = cryptor;
            this.gateKeeperConfig = gateKeeperConfig;
        }

        public async Task CreateUser(RegisterRequest newUser)
        {
            // TODO: Need to check if username already exists

            User user = new User(newUser.Username,
                                newUser.FirstName,
                                newUser.LastName,
                                newUser.Email);

            string encryptedPassword = this.cryptor.Encrypt(newUser.Password, this.gateKeeperConfig.EncryptionKey, this.gateKeeperConfig.Salt);
            UserRecord userRecord = await this.userRepository.SaveUser(user, encryptedPassword);
        }

        public Task DeleteUser(Guid id)
        {
            throw new NotImplementedException();
        }
    }

}