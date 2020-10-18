using System;
using System.Threading.Tasks;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.BudgetPlanning;
using BudgetSquirrel.Business.Infrastructure;
using BudgetSquirrel.Business.Tracking;
using BudgetSquirrel.Data.EntityFramework;

namespace BudgetSquirrel.Api.Infrastructure
{
  public class UnitOfWork : IUnitOfWork
  {
    private IRepository<Budget> budgetRepository;
    private IRepository<BudgetDurationBase> budgetDurationRepository;
    private IRepository<BudgetPeriod> budgetPeriodRepository;
    private IRepository<Fund> fundRepository;
    private BudgetSquirrelContext dbContext;

    public UnitOfWork(
      IRepository<Budget> budgetRepository,
      IRepository<BudgetDurationBase> budgetDurationRepository,
      IRepository<BudgetPeriod> budgetPeriodRepository,
      IRepository<Fund> fundRepository,
      BudgetSquirrelContext dbContext)
    {
      this.budgetRepository = budgetRepository;
      this.budgetDurationRepository = budgetDurationRepository;
      this.budgetPeriodRepository = budgetPeriodRepository;
      this.fundRepository = fundRepository;
      this.dbContext = dbContext;
    }

    public IRepository<T> GetRepository<T>() where T : class
    {
      if (typeof(T) == typeof(Budget))
      {
        return (IRepository<T>) this.budgetRepository;
      }
      else if (typeof(T) == typeof(BudgetDurationBase))
      {
        return (IRepository<T>) this.budgetDurationRepository;
      }
      else if (typeof(T) == typeof(BudgetPeriod))
      {
        return (IRepository<T>) this.budgetPeriodRepository;
      }
      else if (typeof(T) == typeof(Fund))
      {
        return (IRepository<T>) this.fundRepository;
      }
      else
      {
        throw new InvalidOperationException("Cannot find repository for type " + nameof(T));
      }
    }

    public Task SaveChangesAsync() => this.dbContext.SaveChangesAsync();
  }
}