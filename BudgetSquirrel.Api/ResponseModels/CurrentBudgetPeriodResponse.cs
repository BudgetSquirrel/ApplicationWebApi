using System;
using BudgetSquirrel.Business.Tracking;

namespace BudgetSquirrel.Api.ResponseModels
{
    public class CurrentBudgetPeriodResponse
    {
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public DateTime? DateFinalized {get; private set;}

        public CurrentBudgetPeriodResponse(BudgetPeriod budgetPeriod)
        {
            this.StartDate = budgetPeriod.StartDate;
            this.EndDate = budgetPeriod.EndDate;
            this.DateFinalized = budgetPeriod.DateFinalized;
        }
    }
}