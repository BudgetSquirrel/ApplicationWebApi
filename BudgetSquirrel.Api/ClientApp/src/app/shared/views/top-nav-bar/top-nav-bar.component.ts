import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <mat-toolbar color="secondary">
      <mat-toolbar-row>
        <span>Budget Squirrel</span>
        <span routerLink="/home">Home</span>
        <span routerLink="/budgets">Budgets</span>
        <span routerLink="/transactions">Transactions</span>

        <!-- Spacer -->
        <span class="example-spacer"></span>
        <span routerLink="/sign-in">Sign In</span>
        <span routerLink="/sign-up">Sign Up</span>
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
