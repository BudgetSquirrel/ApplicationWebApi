import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetDuration, DurationType, Budget } from '../../models';
import { BudgetApi } from '../../services/budget-api.service';
import { SwitchOption } from 'src/app/shared/components/switch/switch.component';

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

  public durationPickerOptions: SwitchOption<DurationType>[] = [
    {
      identifier: "MonthlyBookEnded",
      text: "Ends on date"
    },
    {
      identifier: "DaySpan",
      text: "Spans number of days"
    }
  ];
  public activeDurationPickerOption: DurationType;

  public isMonthlyBookendedDuration: boolean;
  public isDaySpanDuration: boolean;

  constructor(private budgetService: BudgetApi) {}

  ngOnInit() {
    this.isMonthlyBookendedDuration = this.budgetDuration.durationType == "MonthlyBookEnded";
    this.isDaySpanDuration = this.budgetDuration.durationType == "DaySpan";
    this.activeDurationPickerOption = this.isDaySpanDuration ? "DaySpan" : "MonthlyBookEnded";
  }

  public onCloseClicked() {
    this.onClose.emit();
  }

  public onEditFormSubmit(input: EditDurationEvent) {
    this.onEditSubmit.emit(input);
  }

  public onChangeDurationType(option: SwitchOption<DurationType>) {
    if (option.identifier == "DaySpan") {
      this.isDaySpanDuration = true;
      this.isMonthlyBookendedDuration = false;
    } else {
      this.isMonthlyBookendedDuration = true;
      this.isDaySpanDuration = false;
    }
    this.activeDurationPickerOption = option.identifier;
  }
}
