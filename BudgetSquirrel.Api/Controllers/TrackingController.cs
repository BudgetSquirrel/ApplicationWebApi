using System;
using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.BudgetPlanning;
using BudgetSquirrel.Business.Tracking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TrackingController : Controller
  {
    private IAuthService authService;
    private IUnitOfWork unitOfWork;
    private FundLoader budgetLoader;

    public TrackingController(
      IAuthService authService,
      IUnitOfWork unitOfWork,
      FundLoader budgetLoader)
    {
      this.authService = authService;
      this.unitOfWork = unitOfWork;
      this.budgetLoader = budgetLoader;
    }

    [Authorize]
    [HttpGet("root-fund")]
    public async Task<JsonResult> GetRootFund([FromQuery] DateTime date)
    {
      User currentUser = await this.authService.GetCurrentUser();
      GetRootFundForTrackingQuery query = new GetRootFundForTrackingQuery(this.unitOfWork, this.budgetLoader, currentUser.Id, date);
      Fund rootFund = await query.Run();
      RootFundForTrackingResponse response = new RootFundForTrackingResponse(rootFund);
      return new JsonResult(response);
    }
  }
}
