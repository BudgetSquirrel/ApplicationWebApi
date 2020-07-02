import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Budget } from '../models';
import { BudgetService } from '../services/budget.service';

export interface EditBudgetEvent {
  budget: Budget;
  field: string;
  value: string;
}

@Component({
  selector: 'bs-budget',
  template: `
    <div class="budget-item__container budget-item--level-{{this.level}}">
      <div class="budget-item">
        <div class="budget-item__content">
          <div class="budget-item__header">
            <ng-template [ngIf]="this.isEditingRootName" [ngIfElse]="notEditingRootName">
              <input
                class="inplace-input inplace-input__input inplace-input--large"
                name="root-budget-name"
                aria-label="Root Budget Name"
                (blur)="onBlurInplaceEdit('rootName', $event)"
                (mouseup)="$event.target.focus();" />
            </ng-template>
            <ng-template #notEditingRootName>
              <h2
                class="inplace-input inplace-input__focusable inplace-input--large"
                (mousedown)="onOpenInplaceEdit('rootName', $event)">
                {{this.budget.name}}
              </h2>
            </ng-template>

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
              <ng-template [ngIf]="this.isEditingRootAmount" [ngIfElse]="notEditingRootAmount">
                <input
                  class="inplace-input inplace-input__input inplace-input--short stat stat--editing"
                  type="number"
                  step="0.01"
                  aria-labelledby="rootAmountLabel"
                  (blur)="onBlurInplaceEdit('rootAmount', $event)"
                  (mouseup)="$event.target.focus();" />
              </ng-template>
              <ng-template #notEditingRootAmount>
                <span
                  class="inplace-input inplace-input--short inplace-input__focusable stat stat--editable"
                  (mousedown)="onOpenInplaceEdit('rootAmount', $event)">
                  {{this.budget.setAmount | currency}}
                </span>
              </ng-template>
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
            (addBudget)="onAddBudgetClicked($event)"
            (editBudget)="onEditBudget($event)">
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
  @Output() public editBudget?: EventEmitter<any> = new EventEmitter();

  shouldShowAddBudgetButton: boolean;
  subBudgetLevel: number;
  hasSubBudgets: boolean;

  amountInLabel: string = "AMOUNT IN";
  balanceLabel: string = "BALANCE";

  public isEditingRootName = false;
  public isEditingRootAmount = false;

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

  public onOpenInplaceEdit(field: string, event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    if (field === "rootAmount") {
      this.isEditingRootAmount = true;
    } else if (field === "rootName") {
      this.isEditingRootName = true;
    }
  }

  public onEditBudget(event: EditBudgetEvent) {
    this.editBudget.emit(event);
  }

  public onBlurInplaceEdit(field: string, event: MouseEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.onEditBudget({
      budget: this.budget,
      field,
      value
    });
    if (field === "rootAmount") {
      this.isEditingRootAmount = false;
    } else if (field === "rootName") {
      this.isEditingRootName = false;
    }
  }
}
