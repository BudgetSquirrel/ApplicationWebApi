using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.RequestModels;
using BudgetSquirrel.Api.ResponseModels;
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
  public class BudgetController : Controller
  {
    private readonly IAuthService authService;
    private readonly BudgetLoader budgetLoader;
    private readonly IUnitOfWork unitOfWork;

    public BudgetController(
      IAuthService authService,
      BudgetLoader budgetLoader,
      IUnitOfWork unitOfWork)
    {
      this.authService = authService;
      this.budgetLoader = budgetLoader;
      this.unitOfWork = unitOfWork;
    }

    [Authorize]
    [HttpGet("root-budget")]
    public async Task<JsonResult> GetRootBudget()
    {
      User currentUser = await this.authService.GetCurrentUser();
      GetRootBudgetQuery query = new GetRootBudgetQuery(this.unitOfWork, this.budgetLoader, currentUser.Id);
      Fund rootFund = await query.Run();
      RootBudgetResponse response = new RootBudgetResponse(rootFund);
      return new JsonResult(response);
    }

    [Authorize]
    [HttpPatch("budget")]
    public async Task<JsonResult> EditBudget([FromBody] EditBudgetRequest body)
    {
      User currentUser = await this.authService.GetCurrentUser();
      EditRootBudgetCommand command = new EditRootBudgetCommand(this.unitOfWork, body.BudgetId, currentUser, body.Name, body.SetAmount);
      await command.Run();
      return new JsonResult(new { success = true });
    }

    [Authorize]
    [HttpPost("budget")]
    public async Task<JsonResult> CreateBudget([FromBody] CreateBudgetRequest body)
    {
      CreateBudgetCommand command = new CreateBudgetCommand(this.unitOfWork, body.ParentBudgetId, body.Name, body.SetAmount);
      await command.Run();
      return new JsonResult(new { success = true });
    }

    [Authorize]
    [HttpPatch("duration")]
    public async Task<JsonResult> EditDuration([FromBody] EditDurationRequest body)
    {
      User currentUser = await this.authService.GetCurrentUser();
      if (body.DurationType == EditDurationDurationType.DaySpan)
      {
        EditDaySpanBudgetDuration command = new EditDaySpanBudgetDuration(this.unitOfWork, body.BudgetId, currentUser, body.NumberDays.Value);
        await command.Run();
      }
      else
      {
        EditMonthlyBookendedBudgetDuration command = new EditMonthlyBookendedBudgetDuration(this.unitOfWork, body.BudgetId, currentUser, body.EndDayOfMonth.Value, body.RolloverEndDate.Value);
        await command.Run();
      }
      return new JsonResult(new { success = true });
    }

    [Authorize]
    [HttpDelete("budget/{id}")]
    public async Task<JsonResult> RemoveBudget(Guid id)
    {
      User currentUser = await this.authService.GetCurrentUser();
      RemoveBudgetCommand command = new RemoveBudgetCommand(this.unitOfWork, id, currentUser);
      await command.Run();
      return new JsonResult(new { success = true });
    }

    [Authorize]
    [HttpPost("budget/finalize/{id}")]
    public async Task<JsonResult> FinalizeBudget(Guid id)
    {
      User currentUser = await this.authService.GetCurrentUser();
      FinalizeBudgetPeriodCommand command = new FinalizeBudgetPeriodCommand(this.unitOfWork, this.budgetLoader, id, currentUser);
      await command.Run();

      return new JsonResult(new { success = true });
    }
  }
}