using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.BudgetPlanning;
using BudgetSquirrel.Data.EntityFramework;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BudgetsController : Controller
  {
    private readonly IAuthService authService;
    private readonly IBudgetService budgetService;
    private readonly IAsyncQueryService asyncQueryService;
    private readonly BudgetSquirrelContext context;

    public BudgetsController(IAuthService authService, IBudgetService budgetService, IAsyncQueryService asyncQueryService, BudgetSquirrelContext context)
    {
      this.authService = authService;
      this.budgetService = budgetService;
      this.asyncQueryService = asyncQueryService;
      this.context = context;
    }

    [Authorize]
    [HttpGet("root-budget")]
    public async Task<JsonResult> GetRootBudget()
    {
      RootBudgetResponse response = await this.budgetService.GetRootBudget();
      return new JsonResult(response);
    }

    [Authorize]
    [HttpPost("root/edit")]
    public async Task<JsonResult> EditRootBudget(Guid id, string name, decimal? setAmount)
    {
      User currentUser = await this.authService.GetCurrentUser();
      EditRootBudgetCommand command = new EditRootBudgetCommand(asyncQueryService, this.context.Budgets, id, currentUser, name, setAmount);
      await command.Run();
      return new JsonResult(new { success = true });
    }
  }
}