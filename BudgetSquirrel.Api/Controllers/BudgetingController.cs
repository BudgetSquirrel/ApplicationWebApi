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
  public class BudgetingController : Controller
  {
    private readonly IAuthService authService;
    private readonly IAsyncQueryService asyncQueryService;
    private readonly IUnitOfWork unitOfWork;

    public BudgetingController(
      IAuthService authService,
      IAsyncQueryService asyncQueryService,
      IUnitOfWork unitOfWork)
    {
      this.authService = authService;
      this.asyncQueryService = asyncQueryService;
      this.unitOfWork = unitOfWork;
    }

    [Authorize]
    [HttpGet("root-budget")]
    public async Task<JsonResult> GetRootBudget()
    {
      User currentUser = await this.authService.GetCurrentUser();
      GetRootBudgetQuery query = new GetRootBudgetQuery(this.unitOfWork, this.asyncQueryService, currentUser.Id);
      Budget budget = await query.Run();
      RootBudgetResponse response = new RootBudgetResponse(budget);
      return new JsonResult(response);
    }

    [Authorize]
    [HttpPatch("budget")]
    public async Task<JsonResult> EditBudget([FromBody] EditRootBudgetRequest body)
    {
      User currentUser = await this.authService.GetCurrentUser();
      EditRootBudgetCommand command = new EditRootBudgetCommand(this.asyncQueryService, this.unitOfWork, body.BudgetId, currentUser, body.Name, body.SetAmount);
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
      if (body.DurationType == EditDurationRequest.DurationTypeDaySpan)
      {
        EditDaySpanBudgetDuration command = new EditDaySpanBudgetDuration(this.unitOfWork, this.asyncQueryService, body.BudgetId, currentUser, body.NumberDays.Value);
        await command.Run();
      }
      else
      {
        EditMonthlyBookendedBudgetDuration command = new EditMonthlyBookendedBudgetDuration(this.unitOfWork, this.asyncQueryService, body.BudgetId, currentUser, body.EndDayOfMonth.Value, body.RolloverEndDate.Value);
        await command.Run();
      }
      return new JsonResult(new { success = true });
    }
  }
}