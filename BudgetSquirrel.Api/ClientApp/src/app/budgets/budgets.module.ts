import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetOverviewComponent } from "./budget-overview/budget-overview.component";
import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCheckboxModule } from "@angular/material";
import { BudgetComponent } from './budget/budget.component';
import { AddBudgetFormComponent } from './add-budget-form/add-budget-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDurationFormComponent } from './duration/edit-duration-form/edit-duration-form.component';
import { EditMonthlybookendedDurationFormComponent } from './duration/edit-monthlybookended-duration-form/edit-monthlybookended-duration-form.component';
import { EditDayspanDurationFormComponent } from './duration/edit-dayspan-duration-form/edit-dayspan-duration-form.component';

@NgModule({
  declarations: [
    BudgetOverviewComponent,
    BudgetComponent,
    AddBudgetFormComponent,
    EditDurationFormComponent,
    EditMonthlybookendedDurationFormComponent,
    EditDayspanDurationFormComponent
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
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    BudgetOverviewComponent,
    AddBudgetFormComponent,
    BudgetComponent
  ]
})
export class BudgetsModule { }
