import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Budget } from "../models";
import { MatBottomSheet } from '@angular/material';
import { ConfirmAmountBottomSheetComponent } from '../add-budget-form/confirm-amount-bottom-sheet.component';

export interface EditBudgetEvent {
  budget: Budget;
  field: string;
  value: string;
}

@Component({
  selector: "bs-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.scss"]
})
export class BudgetComponent implements OnInit {

  @Input() budget: Budget;
  @Input() level: number;

  @Output() public addBudget?: EventEmitter<any> = new EventEmitter();
  @Output() public editBudget?: EventEmitter<any> = new EventEmitter();
  @Output() public removeBudget?: EventEmitter<any> = new EventEmitter();

  shouldShowAddBudgetButton: boolean;
  shouldShowActionsAbove: boolean;
  shouldShowActionsToRight: boolean;
  subBudgetLevel: number;
  hasSubBudgets: boolean;

  amountInLabel = "AMOUNT IN";
  balanceLabel = "BALANCE";

  public isEditingRootName = false;
  public isEditingRootAmount = false;

  constructor(private bottomSheet: MatBottomSheet) { }

  getHasSubBudgets(): boolean {
    return !(this.budget.subBudgets === null ||
           this.budget.subBudgets === undefined ||
           this.budget.subBudgets.length === 0);
  }

  ngOnInit() {
    this.subBudgetLevel = this.level + 1;
    this.hasSubBudgets = this.getHasSubBudgets();
    this.shouldShowAddBudgetButton = this.level < 3;
    this.shouldShowActionsAbove = this.level < 3;
    this.shouldShowActionsToRight = this.level == 3;

    if (this.level == 3) {
      this.amountInLabel = "In:";
    }
    if (this.level == 3) {
      this.balanceLabel = "Remaining:";
    }
  }

  public onAddBudgetClicked(budget: Budget) {
    this.addBudget.emit(budget);
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

  public onRemoveBudgetClicked(budget: Budget) {
    this.removeBudget.emit(budget);
  }

  public onEditBudget(event: EditBudgetEvent) {
    this.checkParentForUpdate(parseInt(event.value));

    console.log(parseInt(event.value));

    this.editBudget.emit(event);
  }

  public onBlurInplaceEdit(field: string, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onEditBudget({
      budget: this.budget,
      field,
      value
    });
    if (field === "rootAmount") {
      this.isEditingRootAmount = false;
    } else if (field === "rootName") {
      this.isEditingRootName = false;
    }
  }

  private checkParentForUpdate(amount: number) {
    let combinedBudgetAmounts = amount;

    this.budget.subBudgets.forEach(x => combinedBudgetAmounts = combinedBudgetAmounts + x.setAmount);

    if (combinedBudgetAmounts > this.budget.setAmount) {
      // Combined sub budgets is greater than paren't set amount.

      const difference = combinedBudgetAmounts - this.budget.setAmount;
      this.bottomSheet.open(ConfirmAmountBottomSheetComponent, { data: { amount: difference, parent: this.budget } });
    }
  }
}
