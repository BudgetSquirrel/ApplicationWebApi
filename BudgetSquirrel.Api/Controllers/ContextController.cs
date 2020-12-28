using System.Threading.Tasks;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.BudgetPlanning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ContextController : Controller
  {
    private IAuthService authService;
    private IUnitOfWork unitOfWork;
    private FundLoader budgetLoader;

    public ContextController(
      IAuthService authService,
      IUnitOfWork unitOfWork,
      FundLoader budgetLoader)
    {
      this.authService = authService;
      this.unitOfWork = unitOfWork;
      this.budgetLoader = budgetLoader;
    }
    
    [Authorize]
    [HttpGet("is-current-budget-finalized")]
    public async Task<JsonResult> GetIsCurrentBudgetFinalized()
    {
      User currentUser = await this.authService.GetCurrentUser();
      GetRootBudgetQuery query = new GetRootBudgetQuery(this.unitOfWork, this.budgetLoader, currentUser.Id);
      Fund currentRootFund = await query.Run();

      return new JsonResult(new {
        isFinalized = currentRootFund.CurrentBudget.DateFinalizedTo.HasValue
      });
    }
  }
}