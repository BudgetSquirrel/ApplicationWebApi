using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BudgetsController : Controller
  {
    private readonly IBudgetService budgetService;

    public BudgetsController(IBudgetService budgetService)
    {
      this.budgetService = budgetService;
    }

    [Authorize]
    [HttpGet("root-budget")]
    public async Task<JsonResult> GetRootBudget()
    {
      RootBudgetResponse response = await this.budgetService.GetRootBudget();
      return new JsonResult(response);
    }
  }
}