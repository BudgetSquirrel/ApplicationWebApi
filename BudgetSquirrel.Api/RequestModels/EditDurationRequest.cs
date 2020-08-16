using System;
using System.Text.Json.Serialization;

namespace BudgetSquirrel.Api.RequestModels
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum EditDurationDurationType
  {
    DaySpan,
    MonthlyBookEnded
  }
  
  public class EditDurationRequest
  {
    public EditDurationDurationType DurationType { get; set; }
    
    public Guid BudgetId { get; set; }
    public int? EndDayOfMonth { get; set; }
    public bool? RolloverEndDate { get; set; }

    public int? NumberDays { get; set; }
  }
}