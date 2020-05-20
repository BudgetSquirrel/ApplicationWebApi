using System;
using System.Linq;
using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;
using BudgetSquirrel.Api.Services.Interfaces;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.Auth;
using BudgetSquirrel.Business.BudgetPlanning;
using BudgetSquirrel.Data.EntityFramework;
using BudgetSquirrel.Data.EntityFramework.Models;
using BudgetSquirrel.Data.EntityFramework.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BudgetSquirrel.Api.Services.Implementations
{
  public class BudgetService : IBudgetService
  {
    private readonly IAuthService authService;
    private readonly IAsyncQueryService asyncQueryService;
    private readonly BudgetSquirrelContext context;

    public BudgetService(IAuthService authService, IAsyncQueryService asyncQueryService)
    {
      this.authService = authService;
      this.asyncQueryService = asyncQueryService;
    }
    
    public async Task<RootBudgetResponse> GetRootBudget()
    {
      User currentUser = await this.authService.GetCurrentUser();
      IQueryable<Budget> budgets = this.context.Budgets;
      GetRootBudgetQuery query = new GetRootBudgetQuery(budgets, this.asyncQueryService, currentUser.Id);
      Budget budget = await query.Run();

      return new RootBudgetResponse(budget);
    }
  }
}