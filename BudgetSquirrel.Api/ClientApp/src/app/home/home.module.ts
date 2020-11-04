import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SplashPageComponent } from "./splash-page/splash-page.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { BudgetsModule } from "../budgets/budgets.module";
import { HomeComponent } from "./home/home.component";
import { TrackingModule } from '../tracking/tracking.module';



@NgModule({
  declarations: [
    SplashPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BudgetsModule,
    TrackingModule
  ]
})
export class HomeModule { }
