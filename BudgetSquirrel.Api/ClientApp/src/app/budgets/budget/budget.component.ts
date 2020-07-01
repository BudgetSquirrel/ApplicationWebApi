import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Budget } from '../models';

@Component({
  selector: 'bs-budget',
  template: `
    <div class="budget-item__container budget-item--level-{{this.level}}">
      <div class="budget-item">
        <div class="budget-item__content">
          <div class="budget-item__header">
            <span class="budget-item__name">{{this.budget.name}}</span>

            <ng-template [ngIf]="shouldShowAddBudgetButton" [ngIfElse]="noAddBudgetButton">
              <div class="budget-item__actions">
                <button class="button button--small button--primary" (click)="onAddBudgetClicked(this.budget)">
                  Add SubBudget
                </button>
              </div>
            </ng-template>
            <ng-template #noAddBudgetButton>
            </ng-template>
          </div>

          <div class="budget-item__stats">
            <span class="stat__container">
              <span class="stat__label">
                {{this.amountInLabel}}
              </span>
              <span class="stat">
                {{this.budget.setAmount | currency}}
              </span>
            </span>

            <span class="stat__container budget-item__balance-stat">
              <span class="stat__label">
                {{this.balanceLabel}}
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
            (addBudget)="onAddBudgetClicked($event)">
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

  @Output() public addBudget?: EventEmitter<any> = new EventEmitter();

  shouldShowAddBudgetButton: boolean;
  subBudgetLevel: number;
  hasSubBudgets: boolean;

  amountInLabel: string = "AMOUNT IN";
  balanceLabel: string = "BALANCE";

  getHasSubBudgets(): boolean {
    return !(this.budget.subBudgets === null ||
           this.budget.subBudgets === undefined ||
           this.budget.subBudgets.length === 0);
  }

  ngOnInit() {
    this.subBudgetLevel = this.level + 1;
    this.hasSubBudgets = this.getHasSubBudgets();
    this.shouldShowAddBudgetButton = this.level < 3;
    
    if (this.level == 3) {
      this.amountInLabel = "In:";
    }
    if (this.level == 3) {
      this.balanceLabel = "Remaining:";
    }
  }

  public onAddBudgetClicked(budget: Budget) {
    this.addBudget.emit(budget);
  }
}
