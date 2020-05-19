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

  public isEditingRootName: boolean = false;
  public isEditingRootAmount: boolean = false;

  constructor(private budgetService: BudgetService) { }

  public ngOnInit() {
    this.budgetService.getRootBudget().subscribe(
      (budget: Budget) => this.rootBudget = budget
    );
  }

  public onOpenInplaceEdit(field: string, event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    if (field == "rootAmount") {
      this.isEditingRootAmount = true;
    } else if (field == "rootName") {
      this.isEditingRootName = true;
    }
  }

  public onBlurInplaceEdit(field: string, event: MouseEvent) {
    if (field == "rootAmount") {
      this.isEditingRootAmount = false;
    } else if (field == "rootName") {
      this.isEditingRootName = false;
    }
  }
}
