import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Budget } from "../models";
import { MatBottomSheet } from '@angular/material';
import { ConfirmAmountBottomSheetComponent } from './confirm-amount-bottom-sheet.component';

export interface CreateBudgetEventArguments {
  parentBudget: Budget;
  name: string;
  setAmount: number;
}

@Component({
  selector: "bs-add-budget-form",
  templateUrl: "add-budget-form.component.html",
  styleUrls: ["./add-budget-form.component.scss"]
})
export class AddBudgetFormComponent implements OnInit {

  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onSaveClicked: EventEmitter<CreateBudgetEventArguments> = new EventEmitter();

  @Input() public parentBudget: Budget;

  public newBudgetForm: FormGroup;
  nameValidation = new FormControl("", [Validators.required]);
  fixedAmountValidation = new FormControl("", [Validators.required]);

  constructor(private formBuilder: FormBuilder, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.newBudgetForm = this.formBuilder.group({
      name: this.nameValidation,
      fixedAmount: this.fixedAmountValidation
    }, {
      updateOn: "submit"
    });
  }

  public onCloseClicked() {
    this.onClose.emit("close");
  }

  public onCreateBudgetSubmit() {
    const self = this;
    if (this.newBudgetForm.valid) {
      const name = this.newBudgetForm.value.name;
      const setAmount = this.newBudgetForm.value.fixedAmount;

      // Check if the user wants to increase the parent budget
      this.checkParentForUpdate(setAmount);

      this.onSaveClicked.emit({ parentBudget: this.parentBudget, name, setAmount } as CreateBudgetEventArguments);
    }
  }

  private checkParentForUpdate(amount: number) {
    console.log(this.parentBudget);

    let combinedBudgetAmounts = amount;

    this.parentBudget.subBudgets.forEach(x => combinedBudgetAmounts = combinedBudgetAmounts + x.setAmount);

    if (combinedBudgetAmounts > this.parentBudget.setAmount) {
      // Combined sub budgets is greater than paren't set amount.

      const difference = combinedBudgetAmounts - this.parentBudget.setAmount;
      this.bottomSheet.open(ConfirmAmountBottomSheetComponent, { data: { amount: difference, parent: this.parentBudget } });
    }
  }
}
