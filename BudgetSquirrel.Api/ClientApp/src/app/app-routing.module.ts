import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/components/home/home.component";
import { SignUpComponent } from "./account/sign-up/sign-up.component";
import { SignInComponent } from "./account/sign-in/sign-in.component";
import { SplashPageComponent } from './splash-page/splash-page.component';


const routes: Routes = [
  {
    path: "",
    component: SplashPageComponent,
    data: {
      title: "Budget Squirrel"
    }
  },
  {
    path: "sign-up",
    component: SignUpComponent,
    data: {
      title: "Budget Squirrel - Sign Up"
    }
  },
  {
    path: "sign-in",
    component: SignInComponent,
    data: {
      title: "Budget Squirrel - Sign In"
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
