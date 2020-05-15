import { Component, OnInit } from "@angular/core";
import { BudgetService } from "../services/budget.service";

@Component({
  selector: "bs-budgets",
  template: `
    <div id="budgets">

      <h2>Monthy Budget</h2>
      <div class="root-budget-details">
        <div class="root-budget-stat">
          <h5>Planned Income</h5>
          <span>$6,300.00</span>
        </div>
        <div class="root-budget-stat">
          <h5>Current Balance</h5>
          <span>42,300.00</span>
        </div>
      </div>

    </div>
  `,
  styleUrls: ["./budgets.component.scss"]
})
export class BudgetsComponent implements OnInit {

  constructor(private budgetService: BudgetService) { }

  public ngOnInit() {
  }

}
