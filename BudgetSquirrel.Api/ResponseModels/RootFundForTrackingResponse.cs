using System;
using System.Collections.Generic;
using System.Linq;
using BudgetSquirrel.Business;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class RootFundForTrackingResponse
  {
    public Guid Id { get; set; }

    public string Name { get; set; }

    public decimal BudgetedAmount { get; set; }

    public decimal Balance { get; set; }

    public CurrentBudgetPeriodResponse BudgetPeriod { get; set; }

    public IEnumerable<RootFundForTrackingResponse> SubFunds { get; set; }

    public RootFundForTrackingResponse(Fund rootFund)
    {
      this.Id = rootFund.Id;
      this.Name = rootFund.Name;
      this.BudgetedAmount = rootFund.CurrentBudget.SetAmount;
      this.Balance = rootFund.FundBalance;
      this.BudgetPeriod = new CurrentBudgetPeriodResponse(rootFund.CurrentBudget.BudgetPeriod);
      this.SubFunds = rootFund.SubFunds.Select(f => new RootFundForTrackingResponse(f));
    }
  }
}