using System;

namespace BudgetSquirrel.Api.RequestModels
{
  public class EditBudgetRequest
  {
    public Guid BudgetId { get; set; }
    public string Name { get; set; }
    public decimal? SetAmount { get; set; }
  }
}