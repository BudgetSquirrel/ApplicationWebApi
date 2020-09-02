import { Component, OnInit } from "@angular/core";
import { Budget, nullBudget } from '../models';
import { CreateBudgetEventArguments } from '../add-budget-form/add-budget-form.component';
import { EditBudgetEvent } from '../budget/budget.component';
import { EditDurationEvent } from '../duration/edit-duration-form/edit-duration-form.component';
import { BudgetService } from '../services/budget.service';
import { CurrentBudgetPeriod, nullCurrentBudgetPeriod } from 'src/app/shared/models/tracking';
import { TrackingService } from 'src/app/shared/services/tracking.service';

@Component({
  selector: "bs-budget-overview",
  templateUrl: "./budget-overview.component.html",
  styleUrls: ["./budget-overview.component.scss"]
})
export class BudgetOverviewComponent implements OnInit {

  public rootBudget: Budget = nullBudget;
  public currentBudgetPeriod: CurrentBudgetPeriod = nullCurrentBudgetPeriod;

  public isEditingRootName = false;
  public isEditingRootAmount = false;
  public isEditingDuration = false;

  public wasError = false;

  public parentBudgetForCreateBudget: Budget | null = null;

  get isAddingBudget(): boolean {
    return this.parentBudgetForCreateBudget != null;
  }

  constructor(private budgetService: BudgetService,
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

    if (field === "rootAmount") {
      this.isEditingRootAmount = true;
    } else if (field === "rootName") {
      this.isEditingRootName = true;
    }
  }

  public onEditBudget(event: EditBudgetEvent) {
    if (event.field === "rootAmount") {
      this.budgetService.editBudgetSetAmount(event.budget, parseFloat(event.value)).then(response => {
        this.loadRootBudget();
      });
    } else if (event.field === "rootName") {
      if (!event.value) {
        return;
      }
      this.budgetService.editBudgetName(event.budget, event.value).then(response => {
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

  public async onEditDurationSubmit(input: EditDurationEvent) {
    this.onCloseDurationEditModal();
    await this.budgetService.editDuration(this.rootBudget, {...input});
    await this.loadRootBudget();
  }

  public onSaveBudget(args: CreateBudgetEventArguments) {
    const self = this;
    this.budgetService.createBudget(args.parentBudget, args.name, args.setAmount).then(function() {
      self.loadRootBudget();
      self.parentBudgetForCreateBudget = null;
    });
  }

  public async onRemoveBudget(budget: Budget) {
    await this.budgetService.removeBudget(budget)
    this.loadRootBudget();
  }

  private loadRootBudget() {
    this.budgetService.getRootBudget().subscribe((rootBudget: Budget) => {
      this.rootBudget = rootBudget;
    }, (error) => {
      console.error("Error when fetching root budget");
      console.error(error);
      this.wasError = true;
    });
  }

  private loadCurrentBudgetPeriod() {
    this.trackingService.getCurrentBudgetPeriod().subscribe((currentPeriod: CurrentBudgetPeriod) => {
      this.currentBudgetPeriod = currentPeriod;
    }, (error) => {
      console.error("Error when fetching current budget period");
      console.error(error);
      this.wasError = true;
    })
  }
}
