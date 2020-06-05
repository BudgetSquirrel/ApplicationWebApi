export class Budget {
  budgetStart: Date;
  id: string;
  name: string;
  duration: BudgetDuration;
  fundBalance: number;
  percentAmount?: number;
  setAmount: number;
  subBudgets: Budget[];
}

export type DurationType = "DaySpan" | "MonthlyBookEnded"

export class BudgetDuration {
  id: string;
  durationType: DurationType;
  endDayOfMonth: number;
  numberDays: number;
  rolloverEndDateOnSmallMonths: boolean;
}

export const nullDuration = <BudgetDuration> {};
export const nullBudget = <Budget> { duration: nullDuration };