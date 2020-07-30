import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetDuration, DurationType, Budget } from '../../models';
import { BudgetingService } from '../../services/budgeting.service';

export interface EditDurationEvent {
  endDayOfMonth?: number;
  rolloverEndDate?: boolean;
  durationType: DurationType;
  numberDays?: number;
}

@Component({
  selector: 'bs-edit-duration-form',
  templateUrl: './edit-duration-form.component.html',
  styleUrls: ['./edit-duration-form.component.scss']
})
export class EditDurationFormComponent implements OnInit {

  @Input() budgetDuration: BudgetDuration;

  @Output() public onEditSubmit: EventEmitter<EditDurationEvent> = new EventEmitter();
  @Output() public onClose?: EventEmitter<any> = new EventEmitter();

  public isMonthlyBookendedDuration: boolean;
  public isDaySpanDuration: boolean;

  constructor(private budgetService: BudgetingService) {}

  ngOnInit() {
    this.isMonthlyBookendedDuration = this.budgetDuration.durationType == "MonthlyBookEnded";
    this.isDaySpanDuration = this.budgetDuration.durationType == "DaySpan";
  }

  public onCloseClicked() {
    this.onClose.emit();
  }

  public onEditFormSubmit(input: EditDurationEvent) {
    this.onEditSubmit.emit(input);
  }

  public onChangeDurationType(type: DurationType) {
    if (type == "DaySpan") {
      this.isDaySpanDuration = true;
      this.isMonthlyBookendedDuration = false;
    } else {
      this.isMonthlyBookendedDuration = true;
      this.isDaySpanDuration = false;
    }
  }
}
