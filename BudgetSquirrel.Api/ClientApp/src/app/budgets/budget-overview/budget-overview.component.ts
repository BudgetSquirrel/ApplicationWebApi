import { Component, OnInit } from "@angular/core";
import { Budget, nullBudget } from '../models';
import { CreateBudgetEventArguments } from '../add-budget-form/add-budget-form.component';
import { EditBudgetEvent, EditBudgetFieldName } from '../budget/budget.component';
import { EditDurationEvent } from '../duration/edit-duration-form/edit-duration-form.component';
import { BudgetApi } from '../services/budget-api.service';
import { CurrentBudgetPeriod, nullCurrentBudgetPeriod } from 'src/app/shared/models/tracking';
import { TrackingService } from 'src/app/shared/services/tracking.service';

@Component({
  selector: "bs-budget-overview",
  templateUrl: "./budget-overview.component.html",
  styleUrls: ["./budget-overview.component.scss"]
})
export class BudgetOverviewComponent implements OnInit {

  public rootBudget: Budget = nullBudget;
  public isSubBudgetTotalPlannedAmountTooHigh: boolean;
  public currentBudgetPeriod: CurrentBudgetPeriod = nullCurrentBudgetPeriod;

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public isEditingDuration = false;
  public isAddingBudget = false;

  public wasError = false;
  public plannedAmountColorClass: string;

  constructor(private budgetService: BudgetApi,
              private trackingService: TrackingService)
  { }

  public ngOnInit() {
    this.loadRootBudget();
    this.loadCurrentBudgetPeriod();
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
      this.loadCurrentBudgetPeriod();
    }).catch(() => {
      // TODO: Should we something with an error?
    });
  }

  public onCloseAddBudgetModal() {
    this.isAddingBudget = true;
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

  private loadRootBudget() {
    this.budgetService.getRootBudget().subscribe((rootBudget: Budget) => {
      this.rootBudget = rootBudget;
      this.syncRootBudgetState();
    }, (error) => {
      console.error("Error when fetching root budget");
      console.error(error);
      this.wasError = true;
    });
  }

  private syncRootBudgetState() {
    this.isSubBudgetTotalPlannedAmountTooHigh = this.rootBudget.subBudgetTotalPlannedAmount > this.rootBudget.setAmount;
    if (this.isSubBudgetTotalPlannedAmountTooHigh) {
      this.plannedAmountColorClass = "root-budget-allocated--high";
    } else if (this.rootBudget.subBudgetTotalPlannedAmount < this.rootBudget.setAmount) {
      this.plannedAmountColorClass = "root-budget-allocated--high";
    } else {
      this.plannedAmountColorClass = "";
    }
  }

  private loadCurrentBudgetPeriod() {
    this.trackingService.getCurrentBudgetPeriod().subscribe((currentPeriod: CurrentBudgetPeriod) => {
      this.currentBudgetPeriod = currentPeriod;
    }, (error) => {
      console.error("Error when fetching current budget period");
      console.error(error);
      this.wasError = true;
    });
  }
}
