using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
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
    private readonly IUnitOfWork unitOfWork;

    public BudgetsController(
      IAuthService authService,
      IBudgetService budgetService,
      IAsyncQueryService asyncQueryService,
      IUnitOfWork unitOfWork)
    {
      this.authService = authService;
      this.budgetService = budgetService;
      this.asyncQueryService = asyncQueryService;
      this.unitOfWork = unitOfWork;
    }

    [Authorize]
    [HttpGet("root-budget")]
    public async Task<JsonResult> GetRootBudget()
    {
      RootBudgetResponse response = await this.budgetService.GetRootBudget();
      return new JsonResult(response);
    }

    [Authorize]
    [HttpPatch("root-budget")]
    public async Task<JsonResult> EditRootBudget([FromBody] EditRootBudgetRequest body)
    {
      User currentUser = await this.authService.GetCurrentUser();
      EditRootBudgetCommand command = new EditRootBudgetCommand(this.asyncQueryService, this.unitOfWork, body.BudgetId, currentUser, body.Name, body.SetAmount);
      await command.Run();
      return new JsonResult(new { success = true });
    }
  }
}