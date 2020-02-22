using System.Threading.Tasks;
using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.Business.Auth.Messages;

namespace BudgetTracker.BudgetSquirrel.Application.Interfaces
{
    public interface IAuthenticationApi
    {
        /// <summary>
        /// <p>
        /// Allows a user to register a new account.
        /// </p>
        /// </summary>
        Task<ApiResponse> Register(RegisterUser request);

        Task<ApiResponse> DeleteUser(ApiRequest request);
    }
}
