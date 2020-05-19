import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/shared/services/account.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NewUser, User } from "src/app/shared/models/accounts";
import { ROUTES } from "src/app/route-constants";

@Component({
  selector: "bs-sign-up",
  template: `
  <div class="vert-section">
    <form [formGroup]="this.signupForm" class="vert-section__content signup-page" (ngSubmit)="onSubmit(signupForm)">
      <h1>Register your account</h1>
      <p class="signin-advertisement">Registering your account allows you to track your budget across multiple platforms.</p>

      <fieldset class="name-fieldset">
        <mat-form-field class="form-field form-field--short" appearance="fill">
          <input name="firstName" matInput placeholder="First Name" formControlName="firstName">
          <mat-error *ngIf="firstNameValidation.invalid">Please enter your First Name</mat-error>
        </mat-form-field>

        <mat-form-field class="form-field form-field--short" appearance="fill">
          <input name="lastName" matInput placeholder="Last Name" formControlName="lastName">
          <mat-error *ngIf="lastNameValidation.invalid">Please enter your Last Name</mat-error>
        </mat-form-field>
      </fieldset>

      <mat-form-field class="form-field--block" appearance="fill">
        <input name="username" matInput placeholder="Username" formControlName="username">
        <mat-error *ngIf="usernameValidation.invalid">Please enter your Username</mat-error>
      </mat-form-field>

      <mat-form-field class="form-field--block" appearance="fill">
        <input name="email" matInput placeholder="Email" formControlName="email">
        <mat-error *ngIf="emailValidation.invalid">Please enter your Email</mat-error>
      </mat-form-field>

      <mat-form-field class="form-field--block" appearance="fill">
        <input name="password" matInput minlength="6" placeholder="Password" autocomplete="off"
          [type]="(this.hidePassword ? 'password' : 'text')" formControlName="password">
        <button type="button" mat-icon-button matSuffix (click)="this.hidePassword = !this.hidePassword"
          [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
          <mat-icon tabindex="-1">{{this.hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="passwordValidation.invalid">Password must contain at least 6 characters</mat-error>
      </mat-form-field>

      <mat-form-field class="form-field--block" appearance="fill">
        <input name="confirmPassword" matInput minlength="6" placeholder="Confirm Password" autocomplete="off"
          [type]="(this.hidePassword ? 'password' : 'text')" formControlName="confirmPassword">
        <button type="button" mat-icon-button matSuffix (click)="this.hideConfirmPassword = !this.hideConfirmPassword"
          [attr.aria-label]="'Hide confirm password'" [attr.aria-pressed]="hide">
          <mat-icon tabindex="-1">{{this.hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="confirmPasswordValidation.invalid">Confirm password must match the password above</mat-error>
      </mat-form-field>

      <button class="signup-btn button button--primary button--wide" type="submit">Register</button>
    </form>
  </div>
  `,
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {

  public signupForm: FormGroup;

  firstNameValidation = new FormControl("", [Validators.required]);
  lastNameValidation = new FormControl("", [Validators.required]);
  usernameValidation = new FormControl("", [Validators.required]);
  emailValidation = new FormControl("", [Validators.required, Validators.email]);
  passwordValidation = new FormControl("", [Validators.required, Validators.minLength(6)]);
  confirmPasswordValidation = new FormControl("", [fc => {
    if (fc.value !== this.passwordValidation.value) {
      return {
        confirmPassword: {
          valid: false
        }
      };
    } else {
      return null;
    }
  }]);

  public hidePassword = true;
  public hideConfirmPassword = true;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: this.firstNameValidation,
      lastName: this.lastNameValidation,
      username: this.usernameValidation,
      email: this.emailValidation,
      password: this.passwordValidation,
      confirmPassword: this.confirmPasswordValidation
    }, {
      updateOn: "submit"
    });
  }

  public onSubmit() {
    if (this.signupForm.value.confirmPassword !== this.signupForm.value.password) {
      this.confirmPasswordValidation.setErrors({
        incorrect: true
      });
    }
    if (this.signupForm.valid) {
      const userInfo: NewUser = {
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.confirmPassword,
        email: this.signupForm.value.email,
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName
      };

      this.accountService.createUser(userInfo).subscribe((user: User) => {
        this.router.navigate([ROUTES.HOME]);
      });
    }
  }

}
