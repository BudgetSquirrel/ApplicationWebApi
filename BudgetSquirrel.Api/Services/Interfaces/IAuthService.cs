using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSqurrel.Data.EntityFramework.Models;

namespace BudgetSquirrel.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserRecord> Authenticate(LoginRequest credentials);
    }
}