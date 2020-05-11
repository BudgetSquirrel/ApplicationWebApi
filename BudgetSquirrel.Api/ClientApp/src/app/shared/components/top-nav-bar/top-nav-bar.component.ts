import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { ROUTES } from 'src/app/route-constants';
import { EMPTY_USER, User } from '../../models/accounts';

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <header class="header">
      <a [routerLink]="routes.HOME" class="app-logo-title">
        <span class="logo__container">
          <img src="../../../../assets/logo.svg"/>
        </span>
        <h1 class="app-title color-txt__primary-dark">Budget Squirrel</h1>
      </a>

      <span>
        <a class="nav-link" [routerLink]="routes.SIGN_IN">
          Log In
        </a>
        <a class="nav-link" [routerLink]="routes.SIGN_UP">
          Sign Up
        </a>
      </span>
    </header>
  `,
  styleUrls: ["./top-nav-bar.component.scss"]
})
export class TopNavBarComponent implements OnInit {

  readonly routes = ROUTES;

  public user: User;
  public isAuthenticated: boolean = false;

  constructor(private accountService: AccountService) { }

  public ngOnInit() {
    this.accountService.getUser().subscribe((user: User) => {
      this.user = user;
      this.isAuthenticated = user !== EMPTY_USER;
    });
  }

  public logout() {
    this.accountService.logout();
  }

}
