import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview.component";
import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule } from "@angular/material";
import { BudgetComponent } from './budget/budget.component';
import { AddBudgetFormComponent } from './add-budget-form/add-budget-form.component';

@NgModule({
  declarations: [
    BudgetOverviewComponent,
    BudgetComponent,
    AddBudgetFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule
  ],
  exports: [
    BudgetOverviewComponent,
    AddBudgetFormComponent,
    BudgetComponent
  ]
})
export class BudgetsModule { }
