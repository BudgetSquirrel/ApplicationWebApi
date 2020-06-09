import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Budget } from '../models';

@Component({
  selector: 'bs-budget',
  template: `
    <div class="budget-item__container budget-item--level-{{this.level}}">
      <div class="budget-item">
        <div class="budget-item__actions">
          <button (click)="onAddBudgetClicked()">
            Haha
          </button>
        </div>

        <div class="budget-item__content">
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

      <ng-template [ngIf]="this.hasSubBudgets" [ngIfElse]="hasNoSubBudgets">
        <div class="budget-item__sub-budget-container">
          <bs-budget
            *ngFor="let subBudget of budget.subBudgets"
            [budget]="subBudget"
            [level]="subBudgetLevel"
            (addBudget)="onAddBudgetClicked(subBudget)">
          </bs-budget>
        </div>
      </ng-template>
      <ng-template #hasNoSubBudgets>
      </ng-template>
    </div>
  `,
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  @Input() budget: Budget;
  @Input() level: number;

  @Output() public addBudget: EventEmitter<any> = new EventEmitter();

  get subBudgetLevel(): number {
    return this.level + 1;
  }

  get hasSubBudgets(): boolean {
    return !(this.budget.subBudgets === null ||
           this.budget.subBudgets === undefined ||
           this.budget.subBudgets.length === 0);
  }

  constructor() { }

  ngOnInit() {
  }

  public onAddBudgetClicked() {
    this.addBudget.emit(null);
  }
}
