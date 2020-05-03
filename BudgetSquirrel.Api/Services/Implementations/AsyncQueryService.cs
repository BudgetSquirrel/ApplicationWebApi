using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BudgetSquirrel.Business;
using Microsoft.EntityFrameworkCore;

namespace BudgetSquirrel.Api.Services.Implementations
{
  public class AsyncQueryService : IAsyncQueryService
  {
    public Task<T> SingleOrDefaultAsync<T>(IQueryable<T> source, Expression<Func<T, bool>> predicate)
    {
      return source.SingleOrDefaultAsync(predicate);
    }
  }
}