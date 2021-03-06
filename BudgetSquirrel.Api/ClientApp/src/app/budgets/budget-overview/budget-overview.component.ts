import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Budget, nullBudget } from '../models';
import { CreateBudgetEventArguments } from '../add-budget-form/add-budget-form.component';
import { EditBudgetEvent, EditBudgetFieldName } from '../budget/budget.component';
import { EditDurationEvent } from '../duration/edit-duration-form/edit-duration-form.component';
import { BudgetApi } from '../services/budget-api.service';
import { CurrentBudgetPeriod, nullCurrentBudgetPeriod } from 'src/app/shared/models/core';

@Component({
  selector: "bs-budget-overview",
  templateUrl: "./budget-overview.component.html",
  styleUrls: ["./budget-overview.component.scss"]
})
export class BudgetOverviewComponent implements OnInit {

  @Output() onBudgetFinalized: EventEmitter<void> = new EventEmitter();

  public rootBudget: Budget = nullBudget;
  public plannedIncomeDiffAmountBudgeted: number;
  public plannedIncomeComparedToAmountBudgeted: number;
  public leftToBudgetLabel: string;
  public currentBudgetPeriod: CurrentBudgetPeriod = nullCurrentBudgetPeriod;

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public isEditingDuration = false;
  public isAddingBudget = false;
  public isBudgetFinalized = false;
  public shouldShowFinalizingErrorModal = false;

  public wasError = false;
  public leftToBudgetClassName: string;

  constructor(private budgetService: BudgetApi)
  { }

  public ngOnInit() {
    this.loadRootBudget();
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

  public onEditBudget(event: EditBudgetEvent) {
    if (event.field === "setAmount") {
      this.budgetService.editBudgetSetAmount(event.budget, parseFloat(event.value)).then(response => {
        this.loadRootBudget();
      });
    } else if (event.field === "name") {
      if (!event.value) {
        return;
      }
      this.budgetService.editBudgetName(event.budget, event.value).then(response => {
        this.loadRootBudget();
      });
    }
  }

  public onBlurInplaceEdit(field: EditBudgetFieldName, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onEditBudget({
      budget: this.rootBudget,
      field,
      value
    });
    if (field === "setAmount") {
      this.isEditingRootAmount = false;
    } else if (field === "name") {
      this.isEditingRootName = false;
    }
  }

  public onAddBudgetClick(budget: Budget) {
    this.isAddingBudget = true;
  }

  public onFinalizeBudget(budget: Budget) {
    this.budgetService.finzlizeBudget(budget.id).then(() => {
      this.loadRootBudget();
    }).catch(() => {
      this.shouldShowFinalizingErrorModal = true;
    }).finally(() => {
      this.onBudgetFinalized.emit();
    });
  }

  public onCloseAddBudgetModal() {
    this.isAddingBudget = false;
  }

  public onEditDurationClick() {
    this.isEditingDuration = true;
  }

  public onCloseDurationEditModal() {
    this.isEditingDuration = false;
  }

  public async onEditDurationSubmit(input: EditDurationEvent) {
    this.onCloseDurationEditModal();
    await this.budgetService.editDuration(this.rootBudget, {...input});
    await this.loadRootBudget();
  }

  public onSaveBudget(args: CreateBudgetEventArguments) {
    const self = this;
    this.isAddingBudget = false;
    this.budgetService.createBudget(args.parentBudget, args.name, args.setAmount).then(() => {
      self.loadRootBudget();
    });
  }

  public async onRemoveBudget(budget: Budget) {
    await this.budgetService.removeBudget(budget);
    this.loadRootBudget();
  }

  public onCloseFinalizeErrorModal() {
    this.shouldShowFinalizingErrorModal = false;
  }

  private loadRootBudget() {
    this.budgetService.getRootBudget().subscribe((rootBudget: Budget) => {
      this.rootBudget = rootBudget;
      this.isBudgetFinalized = this.rootBudget.dateFinalized !== undefined && this.rootBudget.dateFinalized !== null;
      this.currentBudgetPeriod = rootBudget.budgetPeriod;
      this.syncRootBudgetState();
    }, (error) => {
      console.error("Error when fetching root budget");
      console.error(error);
      this.wasError = true;
    });
  }

  private syncRootBudgetState() {
    this.plannedIncomeDiffAmountBudgeted = Math.abs(this.rootBudget.setAmount - this.rootBudget.subBudgetTotalPlannedAmount);
    if (this.rootBudget.subBudgetTotalPlannedAmount > this.rootBudget.setAmount) {
      this.leftToBudgetClassName = "root-budget-allocated--high";
      this.leftToBudgetLabel = "Over Budget";
      this.plannedIncomeComparedToAmountBudgeted = -1;
    } else if (this.rootBudget.subBudgetTotalPlannedAmount < this.rootBudget.setAmount) {
      this.leftToBudgetClassName = "";
      this.leftToBudgetLabel = "Left to Budget";
      this.plannedIncomeComparedToAmountBudgeted = 1;
    } else {
      this.leftToBudgetClassName = "";
      this.leftToBudgetLabel = "Left to Budget";
      this.plannedIncomeComparedToAmountBudgeted = 0;
    }
  }
}
