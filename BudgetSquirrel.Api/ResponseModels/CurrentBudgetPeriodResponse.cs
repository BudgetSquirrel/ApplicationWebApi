using System;
using BudgetSquirrel.Business;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class CurrentBudgetPeriodResponse
    {
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }

        public CurrentBudgetPeriodResponse(BudgetPeriod budgetPeriod)
        {
            this.StartDate = budgetPeriod.StartDate;
            this.EndDate = budgetPeriod.EndDate;
        }
    }
}