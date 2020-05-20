using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.BudgetPlanning;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Data.EntityFramework.Models;
using BudgetSquirrel.Data.EntityFramework.Repositories.Interfaces;
using GateKeeper.Configuration;
using GateKeeper.Cryptogrophy;

namespace BudgetSquirrel.Api.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IUserRepository userRepository;
        private readonly BudgetSquirrelContext context;
        private readonly IAsyncQueryService asyncQueryService;
        private readonly ICryptor cryptor;
        private GateKeeperConfig gateKeeperConfig;

        public AccountService(IUserRepository userRepository, BudgetSquirrelContext context, IAsyncQueryService asyncQueryService, ICryptor cryptor, GateKeeperConfig gateKeeperConfig)
        {
            this.userRepository = userRepository;
            this.context = context;
            this.asyncQueryService = asyncQueryService;
            this.cryptor = cryptor;
            this.gateKeeperConfig = gateKeeperConfig;
        }

        public async Task CreateUser(RegisterRequest newUser)
        {
            if (newUser.ConfirmPassword != newUser.Password)
            {
                throw new InvalidOperationException("The confirmation password must match the real password");
            }
            if (await DoesUserExist(newUser.Username))
            {
                throw new InvalidOperationException("That user already exists");
            }

            var command = new CreateUserCommand(
                                this.asyncQueryService,
                                newUser.Username,
                                newUser.FirstName,
                                newUser.LastName,
                                newUser.Email);
            UserRootBudgetRelationship userRootBudgetRelationship = command.Run();

            string encryptedPassword = this.cryptor.Encrypt(newUser.Password, this.gateKeeperConfig.EncryptionKey, this.gateKeeperConfig.Salt);
            UserRecord createdUser = await this.userRepository.SaveUser(userRootBudgetRelationship.User, encryptedPassword);

            this.context.Budgets.Add(userRootBudgetRelationship.RootBudget);
            await this.context.SaveChangesAsync();
        }

        public Task DeleteUser(Guid id)
        {
            throw new NotImplementedException();
        }

        private async Task<bool> DoesUserExist(string username)
        {
            UserRecord user = await this.userRepository.GetByUsername(username);
            return user != null;
        }
    }

}