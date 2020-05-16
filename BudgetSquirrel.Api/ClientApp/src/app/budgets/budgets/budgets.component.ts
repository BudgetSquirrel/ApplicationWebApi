import { Component, OnInit } from "@angular/core";
import { BudgetService } from "../services/budget.service";
import { Budget, nullBudget } from '../models';
import { tap } from 'rxjs/operators';

@Component({
  selector: "bs-budgets",
  templateUrl: "./budgets.component.html",
  styleUrls: ["./budgets.component.scss"]
})
export class BudgetsComponent implements OnInit {

  public rootBudget: Budget = nullBudget;

  constructor(private budgetService: BudgetService) { }

  public ngOnInit() {
    this.budgetService.getRootBudget().subscribe(
      (budget: Budget) => this.rootBudget = budget
    );
  }
}
