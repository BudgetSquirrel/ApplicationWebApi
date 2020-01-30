using System.Threading.Tasks;
using BudgetTracker.Business.Auth;

namespace BudgetTracker.BudgetSquirrel.Application
{
    public interface IAuthenticationService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> GetCurrentUser();
    }
}