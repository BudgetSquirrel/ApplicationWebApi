using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Business.Auth;

namespace BudgetSquirrel.Api.Services.Interfaces
{
    public interface IAccountService
    {
        Task CreateUser(RegisterRequest newUser);
        Task DeleteUser(Guid id);
    }
}