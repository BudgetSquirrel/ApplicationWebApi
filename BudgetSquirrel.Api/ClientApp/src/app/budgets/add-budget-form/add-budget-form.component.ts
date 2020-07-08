import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Budget } from '../models';
import { BudgetingService } from '../services/budgeting.service';

export interface CreateBudgetEventArguments {
  parentBudget: Budget;
  name: string;
  setAmount: number;
}

@Component({
  selector: 'bs-add-budget-form',
  templateUrl: "add-budget-form.component.html",
  styleUrls: ['./add-budget-form.component.scss']
})
export class AddBudgetFormComponent implements OnInit {

  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  @Output() public onSaveClicked: EventEmitter<CreateBudgetEventArguments> = new EventEmitter();

  @Input() public parentBudget: Budget;

  public newBudgetForm: FormGroup;
  nameValidation = new FormControl("", [Validators.required]);
  fixedAmountValidation = new FormControl("", [Validators.required]);

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetingService) { }

  ngOnInit() {
    this.newBudgetForm = this.formBuilder.group({
      name: this.nameValidation,
      fixedAmount: this.fixedAmountValidation
    }, {
      updateOn: "submit"
    });
  }

  public onCloseClicked() {
    this.onClose.emit('close');
  }

  public onCreateBudgetSubmit() {
    const self = this;
    if (this.newBudgetForm.valid) {
      const name = this.newBudgetForm.value.name;
      const setAmount = this.newBudgetForm.value.fixedAmount;
      console.log(name, setAmount, this);
      
      this.onSaveClicked.emit(<CreateBudgetEventArguments>{ parentBudget: this.parentBudget, name, setAmount });
    }
  }
}
