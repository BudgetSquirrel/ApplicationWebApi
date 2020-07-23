using System;

namespace BudgetSquirrel.Api.RequestModels
{
  public class EditDurationRequest
  {
    public const string DurationTypeDaySpan = "DaySpan";
    public const string DurationTypeMonthlyBookEnded = "MonthlyBookEnded";

    public string DurationType { get; set; }
    
    public Guid BudgetId { get; set; }
    public int EndDayOfMonth { get; set; }
    public bool RolloverEndDate { get; set; }

    public int NumberDays { get; set; }
  }
}