using BudgetTracker.Business.Transactions;
using Newtonsoft.Json;

namespace BudgetTracker.BudgetSquirrel.Application.Messages.TransactionApi
{
    public class LogTransactionArgumentApiMessage : IApiMessage
    {
        [JsonProperty("transaction-values")]
        public TransactionMessage TransactionValues { get; set; }
    }
}
