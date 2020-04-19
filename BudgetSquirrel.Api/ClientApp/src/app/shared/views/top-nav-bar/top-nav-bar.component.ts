import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>Budget Squirrel</span>
        <button mat-flat-button color="primary" routerLink="/home">Home</button>
        <button mat-flat-button color="primary" routerLink="/budgets">Budgets</button>
        <button mat-flat-button color="primary" routerLink="/transactions">Transactions</button>

        <!-- Spacer -->
        <span  class="example-spacer"></span>
        <button mat-flat-button color="primary" routerLink="/sign-in">Sign In</button>
        <button mat-flat-button color="primary" routerLink="/sign-up">Sign Up</button>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styleUrls: ["./top-nav-bar.component.scss"]
})
export class TopNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
