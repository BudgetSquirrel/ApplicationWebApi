using BudgetTracker.BudgetSquirrel.Application.Messages;
using BudgetTracker.BudgetSquirrel.Application;
using GateKeeper.Exceptions;

using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using System;
using BudgetTracker.BudgetSquirrel.Application.Messages.TransactionApi;

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
    }
}
