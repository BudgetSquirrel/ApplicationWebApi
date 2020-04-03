import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavBarComponent } from "./views/top-nav-bar/top-nav-bar.component";
import { MatToolbarModule, MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [
    TopNavBarComponent
  ],
  imports: [
    CommonModule,

    // Material
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    TopNavBarComponent
  ]
})
export class SharedModule { }
