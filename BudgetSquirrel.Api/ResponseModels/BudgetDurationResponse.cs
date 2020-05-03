using System;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class BudgetDurationResponse
  {
    public Guid Id { get; set; }

    public int? NumberDays { get; set; }

    public int? EndDayOfMonth { get; set; }

    public bool? RolloverEndDateOnSmallMonths { get; set; }
  }
}