import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { AccountModule } from "./account/account.module";
import { HomeModule } from "./home/home.module";
import { SplashPageComponent } from './splash-page/splash-page.component';
import { VerticalPageSectionComponent } from './components/generic/vertical-page-section/vertical-page-section.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent,
    VerticalPageSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    SharedModule,
    AccountModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
