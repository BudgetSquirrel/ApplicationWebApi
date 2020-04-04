import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { MatFormFieldModule, MatInputModule,  MatIconModule, MatButtonModule } from "@angular/material";

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AccountModule { }
