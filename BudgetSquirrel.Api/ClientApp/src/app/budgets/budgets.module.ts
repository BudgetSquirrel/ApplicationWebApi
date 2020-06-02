import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview.component";
import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule } from "@angular/material";
import { BudgetComponent } from './budget/budget.component';
import { AddBudgetFormComponent } from './add-budget-form/add-budget-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BudgetOverviewComponent,
    BudgetComponent,
    AddBudgetFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    BudgetOverviewComponent,
    AddBudgetFormComponent,
    BudgetComponent
  ]
})
export class BudgetsModule { }
