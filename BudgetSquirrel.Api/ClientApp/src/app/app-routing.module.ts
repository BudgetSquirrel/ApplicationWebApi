import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/components/home/home.component";
import { SignUpComponent } from "./account/sign-up/sign-up.component";
import { SignInComponent } from "./account/sign-in/sign-in.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent,
    data: {
      title: "Budget Squirrel - Home"
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
    path: "sign-up",
    component: SignInComponent,
    data: {
      title: "Budget Squirrel - Sign In"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
