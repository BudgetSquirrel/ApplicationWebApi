using BudgetTracker.BudgetSquirrel.Application.Messages;

using System.Threading.Tasks;

namespace BudgetTracker.BudgetSquirrel.Application.Interfaces
{
    public interface ITransactionApi
    {
        Task<ApiResponse> LogTransaction(ApiRequest request);

        /// <summary>
        /// <p>
        /// Fetches all transactions that have been logged under a given budget
        /// or one of it's sub budgets. This will only load transactions that
        /// were logged between the given start date and end date. The start
        /// date can be no earlier than 730 days (2 years) before the toDate
        /// so that the system isn't trying to load too much.
        /// </p>
        /// <p>
        /// Defaults (if null):
        /// ToDate - DateTime.Now
        /// FromDate - 30 days (1 month) before today.
        /// </p>
        /// </summary>
        Task<ApiResponse> FetchTransactions(ApiRequest request);
    }
}
