import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Budget } from '../models';

@Component({
  selector: 'bs-budget',
  template: `
    <div class="budget-item budget-item--level-{{this.level}}">
      <div class="budget-item__actions">
        <button (click)="onAddBudgetClicked()">
          Haha
        </button>
      </div>

      <div class="budget-item__content">
        <p *ngFor="let subBudget of budget.subBudgets">
          {{subBudget.name}}
          {{subBudget.setAmount | currency}}
        </p>
        <div class="budget-item__name">
          {{this.budget.name}}
        </div>

        <div class="budget-item__stats">
          <span class="stat__container">
            <span class="stat__label">
              AMOUNT IN
            </span>
            <span class="stat">
              {{this.budget.setAmount | currency}}
            </span>
          </span>

          <span class="stat__container budget-item__balance-stat">
            <span class="stat__label">
              BALANCE
            </span>
            <span class="stat">
              {{this.budget.fundBalance | currency}}
            </span>
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  @Input() budget: Budget;
  @Input() level: number;

  @Output() public addBudget: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onAddBudgetClicked() {
    this.addBudget.emit(null);
  }
}
