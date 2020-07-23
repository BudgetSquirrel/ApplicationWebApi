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
    private readonly IAsyncQueryService asyncQueryService;
    private readonly IUnitOfWork unitOfWork;

    public BudgetsController(
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
    public async Task<JsonResult> EditRootBudget([FromBody] EditRootBudgetRequest body)
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
    [HttpDelete("budget/{id}")]
    public async Task<JsonResult> RemoveBudget(Guid id)
    {
      User currentUser = await this.authService.GetCurrentUser();
      RemoveBudgetCommand command = new RemoveBudgetCommand(this.unitOfWork, this.asyncQueryService, id, currentUser);
      await command.Run();
      return new JsonResult(new { success = true });
    }
  }
}