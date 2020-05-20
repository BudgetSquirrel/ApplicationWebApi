using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.BudgetPlanning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BudgetsController : Controller
  {
    private readonly IBudgetService budgetService;
    private readonly IAsyncQueryService asyncQueryService;

    public BudgetsController(IBudgetService budgetService, IAsyncQueryService asyncQueryService)
    {
      this.budgetService = budgetService;
      this.asyncQueryService = asyncQueryService;
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
      EditRootBudgetCommand command = new EditRootBudgetCommand(...)
    }
  }
}