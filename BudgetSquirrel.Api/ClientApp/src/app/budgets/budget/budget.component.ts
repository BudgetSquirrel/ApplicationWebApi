import { Component, OnInit, Input } from '@angular/core';
import { Budget } from '../models';

@Component({
  selector: 'bs-budget',
  template: `
    <div class="budget-item budget-item--level-{{this.level}}">
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
  `,
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  @Input() budget: Budget;
  @Input() level: number;

  constructor() { }

  ngOnInit() {
  }

}
