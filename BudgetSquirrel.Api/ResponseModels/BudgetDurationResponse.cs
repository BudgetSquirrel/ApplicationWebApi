using System;
using BudgetSquirrel.Business.BudgetPlanning;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class BudgetDurationResponse
  {
    public const string DurationTypeMonthlyBookEnded = "MonthlyBookEnded";
    public const string DurationTypeDaySpan = "DaySpan";

    public Guid Id { get; set; }

    public int? NumberDays { get; set; }

    public int? EndDayOfMonth { get; set; }

    public bool? RolloverEndDateOnSmallMonths { get; set; }

    public string DurationType { get; set; }

    public BudgetDurationResponse(BudgetDurationBase durationBase)
    {
      Id = durationBase.Id;
      if (durationBase is DaySpanDuration)
      {
        DurationType = DurationTypeDaySpan;
        NumberDays = ((DaySpanDuration) durationBase).NumberDays;
      }
      else
      {
        DurationType = DurationTypeMonthlyBookEnded;
        EndDayOfMonth = ((MonthlyBookEndedDuration) durationBase).EndDayOfMonth;
        RolloverEndDateOnSmallMonths = ((MonthlyBookEndedDuration) durationBase).RolloverEndDateOnSmallMonths;
      }
    }
  }
}