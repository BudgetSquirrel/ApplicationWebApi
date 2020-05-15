import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { ROUTES } from "src/app/route-constants";
import { EMPTY_USER, User } from "../../models/accounts";

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <header class="header">
      <a [routerLink]="routes.HOME" class="app-logo-title">
        <span class="logo__container">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="31" height="32">
            <path d="M15.2414 22.7272C13.6601 23.8958 11.8006 23.7717 10.613 23.5075C9.776 23.3212 9.24277 22.4758 9.44151 21.6417C9.59136 21.0128 9.89366 20.14 10.4699 18.9439C12.1042 15.5514 14.8926 15.5436 14.8926 15.5436C15.1061 15.0006 15.8704 13.6043 16.4683 13.3452C16.4683 13.3452 20.2055 17.2083 17.0073 19.2905" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.6703 28.5446C9.72441 28.1524 9.18023 25.1069 14.2039 26.1861C14.5077 26.2514 15.042 26.3101 15.3423 26.2301C16.2829 25.9799 18.3011 25.8913 18.3011 23.8276" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.4305 24.0864C22.5048 24.136 24.8325 29.2618 20.7962 29.559C16.7598 29.8562 13.5654 28.4942 13.5654 28.4942" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.3374 31.589C20.3374 31.589 19.7477 33.6695 21.3325 35.2543L19.8738 35.6791C19.1795 35.8814 18.6049 36.3714 18.2957 37.0252C18.0469 37.5511 18.2999 38.1771 18.8454 38.3792C19.6882 38.6915 21.1051 38.839 23.1014 37.798C23.1014 37.798 28.0001 39.1373 29.6115 35.7495C29.6115 35.7495 32.5018 30.9208 30.5207 24.0862C29.1183 19.2479 24.9601 18.1501 22.6507 17.9216C21.7985 17.8373 20.9864 17.5598 20.2054 17.2084C19.235 16.7716 18.365 16.6821 18.365 16.6821" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M24.7876 16.4895C24.7876 16.4895 24.8452 9.61701 30.0949 9.22084C35.3446 8.82467 37.3622 14.2609 37.3622 14.2609" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.8294 14.3934C32.683 13.7383 29.9318 15.3831 31.9623 18.6518C33.9929 21.9205 38.9615 24.1912 37.3625 28.4939C35.4805 33.5583 30.4883 34.1128 30.4883 34.1128" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.3975 20.2686C22.3975 20.2686 30.4883 22.6811 27.573 32.7046" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.3651 29.6011C18.3651 29.6011 17.2654 32.071 18.6193 34.4294C18.6193 34.4294 14.9942 34.8225 16.1376 37.1779" stroke="#E1ECDF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </mask>
            <g mask="url(#mask0)">
            <circle cx="24" cy="24" r="24" fill="#7D5F4A"/>
            </g>
          </svg>
        </span>
        <h1 class="app-title color-txt__primary-dark">Budget Squirrel</h1>
      </a>

      <span *isAuthenticated="false">
        <a class="nav-link" [routerLink]="routes.SIGN_IN">
          Log In
        </a>
        <a class="nav-link" [routerLink]="routes.SIGN_UP">
          Sign Up
        </a>
      </span>

      <span *isAuthenticated="true">
        <span class="nav-link" (click)="this.logout()">
          Log Out
        </span>
      </span>
    </header>
  `,
  styleUrls: ["./top-nav-bar.component.scss"]
})
export class TopNavBarComponent implements OnInit {

  readonly routes = ROUTES;

  public user: User;
  public isAuthenticated = false;

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
