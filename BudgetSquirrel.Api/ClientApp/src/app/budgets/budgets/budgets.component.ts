import { Component, OnInit } from "@angular/core";
import { BudgetService } from "../services/budget.service";
import { Budget, nullBudget } from "../models";
import { tap } from "rxjs/operators";

@Component({
  selector: "bs-budgets",
  templateUrl: "./budgets.component.html",
  styleUrls: ["./budgets.component.scss"]
})
export class BudgetsComponent implements OnInit {

  public rootBudget: Budget = nullBudget;

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public wasError = false;

  constructor(private budgetService: BudgetService) { }

  public ngOnInit() {
    this.loadRootBudget();
  }

  public onOpenInplaceEdit(field: string, event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    if (field === "rootAmount") {
      this.isEditingRootAmount = true;
    } else if (field === "rootName") {
      this.isEditingRootName = true;
    }
  }

  public onBlurInplaceEdit(field: string, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    if (field === "rootAmount") {
      this.isEditingRootAmount = false;
      this.budgetService.editRootBudgetSetAmount(this.rootBudget, parseFloat(value)).then(response => {
        this.loadRootBudget();
      });
    } else if (field === "rootName") {
      this.isEditingRootName = false;
      if (!value) {
        return;
      }
      this.budgetService.editRootBudgetName(this.rootBudget, value).then(response => {
        this.loadRootBudget();
      });
    }
  }

  private loadRootBudget() {
    this.budgetService.getRootBudget().subscribe((rootBudget: Budget) => {
      this.rootBudget = rootBudget;
    }, (error) => {
      this.wasError = true;
    });
  }
}
