import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavBarComponent } from "./components/top-nav-bar/top-nav-bar.component";
import { MatToolbarModule, MatButtonModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { IsAuthenticatedDirective } from "./directives/is-authenticated.directive";
import { IsUnauthenticatedDirective } from "./directives/is-unauthenticated.directive";

@NgModule({
  declarations: [
    TopNavBarComponent,
    IsAuthenticatedDirective,
    IsUnauthenticatedDirective
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Material
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    TopNavBarComponent
  ]
})

export class SharedModule { }
