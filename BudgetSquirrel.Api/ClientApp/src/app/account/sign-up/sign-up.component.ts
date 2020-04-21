import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/shared/services/account.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { NewUser } from 'src/app/shared/interfaces/accounts.interface';

@Component({
  selector: "bs-sign-up",
  template: `
    <form [formGroup]="this.loginForm" class="sign-in" (ngSubmit)="onSubmit(loginForm)">
      <h3>Sign Up</h3>
      <mat-form-field>
        <input name="username" matInput placeholder="Username" formControlName="username">
        <mat-error *ngIf="usernameValidation.invalid">Please enter a username</mat-error>
      </mat-form-field>

      <mat-form-field>
        <input name="password" matInput minlength="6" placeholder="Password" autocomplete="off"
          [type]="(this.hidePassword ? 'password' : 'text')" formControlName="password">
        <button type="button" mat-icon-button matSuffix (click)="this.hidePassword = !this.hidePassword"
          [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
          <mat-icon tabindex="-1">{{this.hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="passwordValidation.invalid">Password must contain at least 6 characters</mat-error>
      </mat-form-field>

      <mat-form-field>
        <input name="confirmPassword" matInput minlength="6" placeholder="Confirm Password" autocomplete="off"
          [type]="(this.hideConfirmPassword ? 'password' : 'text')" formControlName="confirmPassword">
        <button type="button" mat-icon-button matSuffix (click)="this.hideConfirmPassword = !this.hideConfirmPassword"
          [attr.aria-label]="'Hide confirm password'" [attr.aria-pressed]="hide">
          <mat-icon tabindex="-1">{{this.hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="confirmPasswordValidation.invalid">Confirmation password must match Password</mat-error>
      </mat-form-field>

      <button mat-flat-button type="submit" color="primary">Create</button>
    </form>
  `,
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {

  public loginForm: FormGroup;

  usernameValidation = new FormControl("", [Validators.required]);
  passwordValidation = new FormControl("", [Validators.required, Validators.minLength(6)]);
  confirmPasswordValidation = new FormControl("", [fc => {
    if (fc.value != this.passwordValidation.value) {
      return {
        confirmPassword: {
          valid: false
        }
      }
    } else {
      return null;
    }
  }]);

  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: this.usernameValidation,
      password: this.passwordValidation,
      confirmPassword: this.confirmPasswordValidation
    });
  }

  public onSubmit() {
    if (this.loginForm.value.confirmPassword != this.loginForm.value.password)
      this.confirmPasswordValidation.setErrors({
        "incorrect": true
      });
    if (this.loginForm.valid) {
      const userInfo: NewUser = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        confirmPassword: this.loginForm.value.confirmPassword,
        email: "ianmann56@gmail.com",
        firstName: "Ian",
        lastName: "Squirrel"
      };

      this.accountService.createUser(userInfo).subscribe((user: User) => {
        this.router.navigate(["/home"]);
      });
    }
  }

}
