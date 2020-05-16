import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetsComponent } from "./budgets/budgets.component";
import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule } from "@angular/material";

@NgModule({
  declarations: [
    BudgetsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule
  ],
  exports: [
    BudgetsComponent
  ]
})
export class BudgetsModule { }
