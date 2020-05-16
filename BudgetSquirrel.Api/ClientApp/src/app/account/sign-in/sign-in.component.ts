import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/shared/services/account.service";
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";
import { Credentials, User } from "src/app/shared/models/accounts";
import { Router } from "@angular/router";
import { ROUTES } from "src/app/route-constants";

@Component({
  selector: "bs-sign-in",
  template: `
    <div class="vert-section">
      <form [formGroup]="this.loginForm" class="vert-section__content login-page" (ngSubmit)="onSubmit(loginForm)">
        <h1>Login to Budget Squirrel</h1>
        <mat-form-field class="form-field--block" appearance="fill">
          <input name="username" matInput placeholder="Username" formControlName="username">
          <mat-error *ngIf="usernameValidation.invalid">Please enter your username</mat-error>
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

        <button class="login-btn button button--primary button--wide" type="submit">Login</button>
      </form>
    </div>
  `,
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {

  public loginForm: FormGroup;

  usernameValidation = new FormControl("", [Validators.required]);
  passwordValidation = new FormControl("", [Validators.required, Validators.minLength(6)]);

  public hidePassword = true;

  constructor(private formBuilder: FormBuilder,
              private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: this.usernameValidation,
      password: this.passwordValidation
    }, {
      updateOn: "submit"
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.accountService.login(credentials).subscribe((user: User) => {
        this.router.navigate([ROUTES.HOME]);
      });
    }
  }

}
