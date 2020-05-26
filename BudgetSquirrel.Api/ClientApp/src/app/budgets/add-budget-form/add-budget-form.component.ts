import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-add-budget-form',
  templateUrl: "add-budget-form.component.html",
  styleUrls: ['./add-budget-form.component.scss']
})
export class AddBudgetFormComponent implements OnInit {

  @Output() public onClose: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onCloseClicked() {
    this.onClose.emit('close');
  }
}
