using System;
using System.Collections.Generic;
using System.Linq;
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

    public BudgetDurationResponse Duration { get; set; }

    public IEnumerable<RootBudgetResponse> SubBudgets { get; private set; }

    public RootBudgetResponse(Budget budget)
    {
      Id = budget.Id;
      Name = budget.Fund.Name;
      PercentAmount = budget.PercentAmount;
      SetAmount = budget.SetAmount;
      FundBalance = budget.Fund.FundBalance;
      SubBudgetTotalPlannedAmount = budget.SubBudgetTotalPlannedAmount;
      Duration = new BudgetDurationResponse(budget.Fund.Duration);
      SubBudgets = budget.SubBudgets.Select(b => new RootBudgetResponse(b));
    }
  }
}