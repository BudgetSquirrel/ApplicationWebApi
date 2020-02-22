using BudgetTracker.BudgetSquirrel.Application.Messages;
using GateKeeper.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BudgetTracker.BudgetSquirrel.Application.Interfaces;

namespace BudgetTracker.BudgetSquirrel.WebApi.Controllers
{
    [Route("api/transactions")]
    [ApiController]
    public class TransactionApiController : ControllerBase
    {

        private readonly ITransactionApi _transactionApi;

        public TransactionApiController(ITransactionApi transactionApi)
        {
            _transactionApi = transactionApi;
        }

        [HttpPost("log-transaction")]
        public async Task<IActionResult> LogTransaction(ApiRequest request)
        {
            try
            {
                return new JsonResult(await _transactionApi.LogTransaction(request));
            }
            catch (AuthenticationException)
            {
                return Forbid();
            }
        }

        [HttpPost()]
        public async Task<IActionResult> FetchTransactions(ApiRequest request)
        {
            try
            {
                return new JsonResult(await _transactionApi.FetchTransactions(request));
            }
            catch (AuthenticationException) {
                return Forbid();
            }
        }
    }
}
