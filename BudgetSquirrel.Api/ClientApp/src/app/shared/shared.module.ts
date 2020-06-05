import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TopNavBarComponent } from "./components/top-nav-bar/top-nav-bar.component";
import { MatToolbarModule, MatButtonModule } from "@angular/material";
import { RouterModule } from "@angular/router";
import { IsAuthenticatedDirective } from "./directives/is-authenticated.directive";
import { NotificationBannerComponent } from "./components/notification-banner/notification-banner.component";

@NgModule({
  declarations: [
    TopNavBarComponent,
    IsAuthenticatedDirective,
    NotificationBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Material
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    TopNavBarComponent,
    IsAuthenticatedDirective,
    NotificationBannerComponent
  ]
})

export class SharedModule { }
