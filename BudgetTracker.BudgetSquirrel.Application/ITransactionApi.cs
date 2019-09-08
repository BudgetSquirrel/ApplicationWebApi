using BudgetTracker.BudgetSquirrel.Application.Messages;

using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application
{
    public interface ITransactionApi
    {
        Task<ApiResponse> LogTransaction(ApiRequest request);
    }
}
