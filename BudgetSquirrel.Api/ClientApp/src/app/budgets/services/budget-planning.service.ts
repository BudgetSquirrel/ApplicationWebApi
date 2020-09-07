import { Injectable } from '@angular/core';
import { Budget } from '../models';

export interface BudgetState {
  hasBeenEdited: boolean;
  /**
   * The last budget on the page that was modified under this budget.
   * This only tracks changes to sub budgets of this budget or this
   * budget itself. Changes in budgets anywhere else in the budget
   * tree are not recorded here.
   */
  lastModifiedBudget: Budget | null;
};

function nullBudgetState(): BudgetState {
  return {
    hasBeenEdited: false,
    lastModifiedBudget: null
  };
}

@Injectable({
  providedIn: 'root'
})
export class BudgetPlanningService {

  private budgetStates: { [budgetId: string]: BudgetState } = {};

  constructor() { }

  public getBudgetState(budget: Budget): BudgetState {
    const state = this.budgetStates[budget.id];
    if (state) {
      return state;
    } else {
      return nullBudgetState();
    }
  }

  public setBudgetState<K extends keyof BudgetState>(budget: Budget, stateName: K, value: BudgetState[K]) {
    if (!this.budgetStates[budget.id]) {
      this.budgetStates[budget.id] = nullBudgetState();
    }
    const state = this.budgetStates[budget.id];

    state[stateName] = value;
  }
}
