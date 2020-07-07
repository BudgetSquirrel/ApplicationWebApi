import { Component, OnInit } from "@angular/core";
import { BudgetService } from "../services/budget.service";
import { Budget, nullBudget } from '../models';
import { tap } from 'rxjs/operators';
import { CreateBudgetEventArguments } from '../add-budget-form/add-budget-form.component';
import { EditBudgetEvent } from '../budget/budget.component';

@Component({
  selector: "bs-budget-overview",
  templateUrl: "./budget-overview.component.html",
  styleUrls: ["./budget-overview.component.scss"]
})
export class BudgetOverviewComponent implements OnInit {

  public rootBudget: Budget = nullBudget;

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public isEditingDuration = false;

  public wasError = false;

  public parentBudgetForCreateBudget: Budget | null = null;

  get isAddingBudget(): boolean {
    return this.parentBudgetForCreateBudget != null;
  }

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

  public onEditBudget(event: EditBudgetEvent) {
    if (event.field === "rootAmount") {
      this.budgetService.editRootBudgetSetAmount(event.budget, parseFloat(event.value)).then(response => {
        this.loadRootBudget();
      });
    } else if (event.field === "rootName") {
      if (!event.value) {
        return;
      }
      this.budgetService.editRootBudgetName(event.budget, event.value).then(response => {
        this.loadRootBudget();
      });
    }
  }

  public onBlurInplaceEdit(field: string, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onEditBudget({
      budget: this.rootBudget,
      field,
      value
    });
    if (field === "rootAmount") {
      this.isEditingRootAmount = false;
    } else if (field === "rootName") {
      this.isEditingRootName = false;
    }
  }

  public onAddBudgetClick(budget: Budget) {
    this.parentBudgetForCreateBudget = budget;
  }

  public onCloseAddBudgetModal() {
    this.parentBudgetForCreateBudget = null;
  }

  public onEditDurationClick() {
    this.isEditingDuration = true;
  }

  public onCloseDurationEditModal() {
    this.isEditingDuration = false;
  }

  public onSaveBudget(args: CreateBudgetEventArguments) {
    const self = this;
    this.budgetService.createBudget(args.parentBudget, args.name, args.setAmount).then(function() {
      self.loadRootBudget();
      self.parentBudgetForCreateBudget = null;
    });
  }

  private loadRootBudget() {
    this.budgetService.getRootBudget().subscribe((rootBudget: Budget) => {
      this.rootBudget = rootBudget;
    }, (error) => {
      this.wasError = true;
    });
  }
}
