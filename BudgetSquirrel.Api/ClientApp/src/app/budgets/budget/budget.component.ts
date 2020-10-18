import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Budget } from '../models';
import { BudgetPlanningService } from '../services/budget-planning.service';
import { CreateBudgetEventArguments } from '../add-budget-form/add-budget-form.component';

export type EditBudgetFieldName = "setAmount" | "name";

export interface EditBudgetEvent {
  budget: Budget;
  field: EditBudgetFieldName;
  value: string;
}

@Component({
  selector: 'bs-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit, OnChanges {

  @Input() budget: Budget;
  @Input() level: number;

  @Output() public createSubBudget?: EventEmitter<CreateBudgetEventArguments> = new EventEmitter();
  @Output() public editBudget?: EventEmitter<any> = new EventEmitter();
  @Output() public removeBudget?: EventEmitter<any> = new EventEmitter();

  public constructor(private budgetPlanningService: BudgetPlanningService) {}

  /* ===== Budget Display Properties ===== */

  public shouldShowAddBudgetButton: boolean;
  public shouldShowActionsAbove: boolean;
  public shouldShowActionsToRight: boolean;
  public subBudgetLevel: number;
  public hasSubBudgets: boolean;

  get shouldCheckSubBudgetParentBudgetAmounts() {
    if (!this.lastModifiedBudget) {
      return false;
    }
    const hasBeenEdited = this.budgetPlanningService.getBudgetState(this.budget).hasBeenEdited;
    const wasEditForSubBudget = this.lastModifiedBudget.id === this.budget.id;

    return !wasEditForSubBudget && hasBeenEdited;
  }

  get lastModifiedBudget(): Budget | null {
    return this.budgetPlanningService.getBudgetState(this.budget).lastModifiedBudget;
  }
  set lastModifiedBudget(value: Budget | null) {
    this.budgetPlanningService.setBudgetState(this.budget, "lastModifiedBudget", value);
  }

  /**
   * Whether or not we should ask the user if they want to update
   * this budgets parent budget because it's planned amount is less
   * than the planned amounts of it's sub budgets.
   */
  public isPlannedDifferentThanAllocated: boolean = false;

  amountInLabel: string = "PLANNED";
  balanceLabel: string = "BALANCE";

  /* ===== Component Interactions State ===== */

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public shouldShowUpdateParentAmountModal = false;
  public isAddingBudget = false;

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
    this.isPlannedDifferentThanAllocated = this.hasSubBudgets && (this.budget.subBudgetTotalPlannedAmount != this.budget.setAmount);

    if (this.level == 3) {
      this.amountInLabel = "Planned:";
    }
    if (this.level == 3) {
      this.balanceLabel = "Remaining:";
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const budgetChange = changes.budget;
    if (this.shouldCheckSubBudgetParentBudgetAmounts) {
      this.updateShouldShowUpdateParentAmountModal(budgetChange);
    }
  }

  public onAddBudgetClicked() {
    this.isAddingBudget = true;
  }

  public onCloseAddBudgetModal() {
    this.isAddingBudget = false;
  }

  public onFinalizeCreateBudget(args: CreateBudgetEventArguments) {
    this.budgetPlanningService.setHasBeenEdited(this.budget, { name: args.name } as any as Budget);
    this.isAddingBudget = false;
    this.createSubBudget.emit(args);
  }

  public onOpenInplaceEdit(field: string, event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    if (field === "setAmount") {
      this.isEditingRootAmount = true;
    } else if (field === "name") {
      this.isEditingRootName = true;
    }
  }

  public onRemoveBudgetClicked(budget: Budget) {
    this.removeBudget.emit(budget);
  }

  public onEditBudget(event: EditBudgetEvent, modifiedBudget: Budget) {
    this.budgetPlanningService.setHasBeenEdited(this.budget, modifiedBudget);
    this.editBudget.emit(event);
  }

  public onBlurInplaceEdit(field: EditBudgetFieldName, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onEditBudget({
      budget: this.budget,
      field,
      value
    },
    this.budget);
    if (field === "setAmount") {
      this.isEditingRootAmount = false;
    } else if (field === "name") {
      this.isEditingRootName = false;
    }
  }

  public onCloseUpdateParentBudgetAmountClicked() {
    this.shouldShowUpdateParentAmountModal = false;
    this.lastModifiedBudget = null;
  }

  public onUpdateBudgetPlannedAmountToSubBudgetsClicked() {
    const newSetAmount = this.budget.subBudgetTotalPlannedAmount;
    this.onEditBudget({
      budget: this.budget,
      field: "setAmount",
      value: newSetAmount.toString()
    },
    this.budget);
  }

  /**
   * Show update parent modal if the child sub budgets set amounts total up
   * to be greater than this budgets set amount.
   * 
   * Don't show it on page load (there was no previous change).
   */
  private updateShouldShowUpdateParentAmountModal(budgetChange: SimpleChange) {
    const updatedBudget: Budget = budgetChange.currentValue;
    
    const isPlannedDifferentThanAllocated = updatedBudget.subBudgetTotalPlannedAmount != updatedBudget.setAmount;
    if (isPlannedDifferentThanAllocated) {
      this.shouldShowUpdateParentAmountModal = true;
    }
  }
}
