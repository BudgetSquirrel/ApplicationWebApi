import { Component, OnInit } from "@angular/core";
import { AccountService } from "../../services/account.service";
import { User, EMPTY_USER } from '../../interfaces/user.interface';

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Budget Squirrel</span>
        <button mat-flat-button color="primary" routerLink="/home">Home</button>
        <button mat-flat-button color="primary" routerLink="/home">Budgets</button>
        <button mat-flat-button color="primary" routerLink="/home">Transactions</button>

        <!-- Spacer -->
        <span  class="example-spacer"></span>

        <div *ngIf="!this.isAuthenticated">
          <button mat-flat-button color="primary" routerLink="/sign-in">Sign In</button>
          <button mat-flat-button color="primary" routerLink="/sign-up">Sign Up</button>
        </div>
        <div *ngIf="this.isAuthenticated">
          <span>{{user.firstName}} {{user.lastName}}</span>
          <button mat-flat-button color="primary" (click)="logout()">Logout</button>
        </div>

      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ["./top-nav-bar.component.scss"]
})
export class TopNavBarComponent implements OnInit {

  public user: User;
  public isAuthenticated: boolean = false;

  constructor(private accountService: AccountService) { }

  public ngOnInit() {
    this.accountService.getUser().subscribe((user: User) => {
      console.log("change in auth");
      
      this.user = user;
      this.isAuthenticated = user !== EMPTY_USER;
    });
  }

  public logout() {
    this.accountService.logout();
  }

}
