import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetDuration, DurationType } from '../../models';

export interface EditDurationEvent {
  endDayOfMonth: number,
  rolloverEndDate: boolean,
  durationType: DurationType
}

@Component({
  selector: 'bs-edit-duration-form',
  templateUrl: './edit-duration-form.component.html',
  styleUrls: ['./edit-duration-form.component.scss']
})
export class EditDurationFormComponent implements OnInit {

  @Input() budgetDuration: BudgetDuration;

  @Output() public onClose?: EventEmitter<any> = new EventEmitter();

  public isMonthlyBookendedDuration: boolean;
  public isDaySpanDuration: boolean;

  constructor() {}

  ngOnInit() {
    this.isMonthlyBookendedDuration = this.budgetDuration.durationType == "MonthlyBookEnded";
    this.isDaySpanDuration = this.budgetDuration.durationType == "DaySpan";
  }

  public onCloseClicked() {
    this.onClose.emit();
  }

  public onEditFormSubmit(input: EditDurationEvent) {
    console.log(input);
  }
}
