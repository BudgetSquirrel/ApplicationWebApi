export class Budget {
  budgetStart: Date;
  id: string;
  name: string;
  duration: BudgetDuration;
  fundBalance: number;
  percentAmount?: number;
  setAmount: number;
  subBudgetTotalPlannedAmount: number;
  subBudgets: Budget[];
}

export type DurationType = "DaySpan" | "MonthlyBookEnded";

export class BudgetDuration {
  id: string;
  durationType: DurationType;
  endDayOfMonth: number | null;
  numberDays: number | null;
  rolloverEndDateOnSmallMonths: boolean | null;
}

export const nullDuration = {} as BudgetDuration;
export const nullBudget = { duration: nullDuration } as Budget;
