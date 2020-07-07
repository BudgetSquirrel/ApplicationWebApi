import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetDuration } from '../../models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditDurationEvent } from '../edit-duration-form/edit-duration-form.component';

@Component({
  selector: 'bs-edit-monthlybookended-duration-form',
  templateUrl: './edit-monthlybookended-duration-form.component.html',
  styleUrls: ['./edit-monthlybookended-duration-form.component.scss']
})
export class EditMonthlybookendedDurationFormComponent implements OnInit {

  @Input() budgetDuration: BudgetDuration;

  @Output() submitEditForm?: EventEmitter<any> = new EventEmitter();

  public editDurationForm: FormGroup;
  public endDayOfMonthValidation: FormControl;
  public rollOverEndDateValidation: FormControl;

  constructor() { }

  ngOnInit() {
    this.endDayOfMonthValidation = new FormControl(this.budgetDuration.endDayOfMonth, [Validators.required]);
    this.rollOverEndDateValidation = new FormControl(this.budgetDuration.rolloverEndDateOnSmallMonths, [Validators.required]);
    this.editDurationForm = new FormGroup({
      endDayOfMonth: this.endDayOfMonthValidation,
      rolloverEndDate: this.rollOverEndDateValidation
    }, {
      updateOn: "submit"
    });
  }

  public onSubmitEditForm() {
    if (this.editDurationForm.valid) {
      const submitValues = <EditDurationEvent> {
        durationType: "MonthlyBookEnded",
        endDayOfMonth: this.editDurationForm.value.endDayOfMonth,
        rolloverEndDate: this.editDurationForm.value.rolloverEndDate,
      };
      this.submitEditForm.emit(submitValues);
    }
  }
}
