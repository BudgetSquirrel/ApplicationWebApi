export interface CurrentBudgetPeriod {
  startDate: Date;
  endDate: Date;
}

export const nullCurrentBudgetPeriod: CurrentBudgetPeriod = {
  startDate: new Date(0),
  endDate: new Date(0)
};