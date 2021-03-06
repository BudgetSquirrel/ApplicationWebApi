import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./account/sign-up/sign-up.component";
import { SignInComponent } from "./account/sign-in/sign-in.component";
import { HomeComponent } from "./home/home/home.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
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
