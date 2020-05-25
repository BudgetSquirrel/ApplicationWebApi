using System;

namespace BudgetSquirrel.Api.RequestModels
{
  public class EditRootBudgetRequest
  {
    public Guid BudgetId { get; set; }
    public string Name { get; set; }
    public decimal? SetAmount { get; set; }
  }
}