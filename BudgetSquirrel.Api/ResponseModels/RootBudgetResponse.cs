using System;
using System.Collections.Generic;
using System.Linq;
using BudgetSquirrel.Business;
using BudgetSquirrel.Business.BudgetPlanning;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class RootBudgetResponse
  {
    public Guid Id { get; private set; }

    public string Name { get; private set; }

    public double? PercentAmount { get; private set; }

    public decimal SetAmount { get; private set; }

    public decimal FundBalance { get; private set; }

    public decimal SubBudgetTotalPlannedAmount { get; private set; }

    public DateTime? DateFinalized { get; private set; }

    public CurrentBudgetPeriodResponse BudgetPeriod { get; private set; }

    public BudgetDurationResponse Duration { get; set; }

    public IEnumerable<RootBudgetResponse> SubBudgets { get; private set; }

    public RootBudgetResponse(Fund fund)
    {
      Budget budget = fund.CurrentBudget;
      Id = budget.Id;
      Name = fund.Name;
      PercentAmount = budget.PercentAmount;
      SetAmount = budget.SetAmount;
      FundBalance = fund.FundBalance;
      DateFinalized = budget.DateFinalizedTo;
      SubBudgetTotalPlannedAmount = budget.SubBudgetTotalPlannedAmount;
      BudgetPeriod = new CurrentBudgetPeriodResponse(budget.BudgetPeriod);
      Duration = new BudgetDurationResponse(fund.Duration);
      SubBudgets = fund.SubFunds.Select(f => new RootBudgetResponse(f));
    }
  }
}