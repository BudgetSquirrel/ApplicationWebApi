using System.Threading.Tasks;
using BudgetSquirrel.Api.ResponseModels;

namespace BudgetSquirrel.Api.Services.Interfaces
{
  public interface IBudgetService
  {
    Task<RootBudgetResponse> GetRootBudget();
  }
}