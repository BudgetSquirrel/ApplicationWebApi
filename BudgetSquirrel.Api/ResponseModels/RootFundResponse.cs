using System;
using BudgetSquirrel.Business;

namespace BudgetSquirrel.Api.ResponseModels
{
  public class RootFundResponse
  {
    public Guid Id { get; set; }

    public string Name { get; set; }

    public RootFundResponse(Fund rootFund)
    {
      this.Id = rootFund.Id;
      this.Name = rootFund.Name;
    }
  }
}