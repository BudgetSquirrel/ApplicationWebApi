using System;

namespace BudgetSquirrel.Api.RequestModels
{
  public class CreateBudgetRequest
  {
    public Guid ParentBudgetId { get; set; }
    public string Name { get; set; }
    public decimal SetAmount { get; set; }
  }
}