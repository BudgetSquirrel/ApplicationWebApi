import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BudgetDuration } from "../../models";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EditDurationEvent } from "../edit-duration-form/edit-duration-form.component";

@Component({
  selector: "bs-edit-dayspan-duration-form",
  templateUrl: "./edit-dayspan-duration-form.component.html",
  styleUrls: ["./edit-dayspan-duration-form.component.scss"]
})
export class EditDayspanDurationFormComponent implements OnInit {

  @Input() budgetDuration: BudgetDuration;

  @Output() submitEditForm?: EventEmitter<any> = new EventEmitter();

  public editDurationForm: FormGroup;
  public numberDaysValidation: FormControl;

  constructor() { }

  ngOnInit() {
    this.numberDaysValidation = new FormControl(this.budgetDuration.numberDays, [Validators.required]);
    this.editDurationForm = new FormGroup({
      numberDays: this.numberDaysValidation
    }, {
      updateOn: "submit"
    });
  }

  public onSubmitEditForm() {
    if (this.editDurationForm.valid) {
      const submitValues = {
        durationType: "DaySpan",
        numberDays: this.editDurationForm.value.numberDays
      } as EditDurationEvent;
      this.submitEditForm.emit(submitValues);
    }
  }
}
