import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bs-top-nav-bar",
  template: `
    <mat-toolbar color="accent">
      <mat-toolbar-row>
        <span>Budget Squirrel</span>
        <button mat-button-raised routerLink="/home">Home</button>
        <button mat-button-raised routerLink="/budgets">Budgets</button>
        <button mat-button-raised routerLink="/transactions">Transactions</button>

        <!-- Spacer -->
        <span  class="example-spacer"></span>
        <button mat-button-raised color="primary" routerLink="/sign-in">Sign In</button>
        <button mat-button-raised color="primary" routerLink="/sign-up">Sign Up</button>
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
