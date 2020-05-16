using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BudgetSquirrel.Business;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace BudgetSquirrel.Api.Services.Implementations
{
  public class AsyncQueryService : IAsyncQueryService
  {
    public IQueryable<T> Include<T, TProperty>(IQueryable<T> source, Expression<Func<T, TProperty>> include) where T : class
    {
      if (source is DbSet<T>)
      {
        DbSet<T> includable = ((DbSet<T>) source);
        return includable.Include(include);
      }
      else
      {
        throw new InvalidOperationException("source must be a DbSet, not " + source.GetType().Name);
      }
    }

    public Task<T> SingleOrDefaultAsync<T>(IQueryable<T> source, Expression<Func<T, bool>> predicate)
    {
      return source.SingleOrDefaultAsync(predicate);
    }
  }
}