using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.Tracking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BudgetSquirrel.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrackingController : Controller
    {
        private readonly IAuthService authService;
        private readonly IAsyncQueryService asyncQueryService;
        private readonly IUnitOfWork unitOfWork;

        public TrackingController(
            IAuthService authService,
            IAsyncQueryService asyncQueryService,
            IUnitOfWork unitOfWork)
        {
            this.authService = authService;
            this.asyncQueryService = asyncQueryService;
            this.unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpGet("current-period")]
        public async Task<JsonResult> GetCurrentBudgetPeriod()
        {
            User currentUser = await this.authService.GetCurrentUser();
            GetCurrentBudgetPeriodQuery query = new GetCurrentBudgetPeriodQuery(this.unitOfWork, this.asyncQueryService, currentUser.Id);
            BudgetPeriod current = await query.Run();
            CurrentBudgetPeriodResponse response = new CurrentBudgetPeriodResponse(current);
            return new JsonResult(response);
        }
    }
}