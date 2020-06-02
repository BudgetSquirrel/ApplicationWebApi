import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'bs-add-budget-form',
  templateUrl: "add-budget-form.component.html",
  styleUrls: ['./add-budget-form.component.scss']
})
export class AddBudgetFormComponent implements OnInit {

  @Output() public onClose: EventEmitter<any> = new EventEmitter();

  public newBudgetForm: FormGroup;
  nameValidation = new FormControl("", [Validators.required]);
  fixedAmountValidation = new FormControl("", [Validators.required]);

  constructor(private formBuilder: FormBuilder) {
  }

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
    if (this.newBudgetForm.valid) {
      const body = {
        name: this.newBudgetForm.value.name,
        fixedAmount: this.newBudgetForm.value.fixedAmount
      };
      console.log(body);
      
    }
  }
}
