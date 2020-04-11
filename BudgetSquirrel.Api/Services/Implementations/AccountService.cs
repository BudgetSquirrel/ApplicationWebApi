using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Data.EntityFramework.Repositories.Interfaces;

namespace BudgetSquirrel.Api.Services.Implementations
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository accountRepository;
        public AccountService(IAccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

        public async Task<User> CreateUser(RegisterRequest newUser)
        {
            User user = null;
            try
            {
                var userRecord = await this.accountRepository.CreateUser(new User(Guid.NewGuid(),
                                newUser.Username,
                                newUser.FirstName,
                                newUser.LastName,
                                newUser.Email));

                if (userRecord != null)
                {
                    user = new User(userRecord.Id,
                                    userRecord.Username,
                                    userRecord.FirstName,
                                    userRecord.LastName,
                                    userRecord.Email);
                }
                else
                {
                    throw new Exception("Something went wrong creating the user.");
                }
            }
            catch (Exception)
            {
                // Log exception and rethrow?
                throw;
            }

            return user;
        }

        public Task DeleteUser(Guid id)
        {
            throw new NotImplementedException();
        }
    }

}