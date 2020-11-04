import { Component, OnInit } from "@angular/core";
import { AccountService } from 'src/app/shared/services/account.service';
import { AppContextService } from 'src/app/shared/services/app-context.service';

@Component({
  selector: "bs-home",
  template: `
    <!-- Unauthenticated -->
    <bs-splash-page *ngIf="!this.isAuthenticated"></bs-splash-page>

    <!-- Authenticated -->
    <ng-template [ngIf]="this.isAuthenticated">
      <ng-template [ngIf]="!this.isCurrentBudgetFinalized" [ngIfElse]="trackingHome">
        <bs-budget-overview *ngIf="this.isAuthenticated" (onBudgetFinalized)="this.onBudgetFinalized()"></bs-budget-overview>
      </ng-template>
      <ng-template #trackingHome>
        <bs-tracking-home *ngIf="this.isAuthenticated">
        </bs-tracking-home>
      </ng-template>
    </ng-template>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  public isCurrentBudgetFinalized: boolean = false;
  public isAuthenticated: boolean = false;

  constructor(private appContextService: AppContextService, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getUser().subscribe(() => {
      this.refreshIsAuthenticated();
    });
  }

  async refreshIsCurrentBudgetFinalized() {
    if (this.isAuthenticated) {
      this.isCurrentBudgetFinalized = await this.appContextService.isCurrentBudgetFinalized();
    } else {
      this.isCurrentBudgetFinalized = false;
    }
  }

  async refreshIsAuthenticated() {
    this.isAuthenticated = this.accountService.isAuthenticated();
    await this.refreshIsCurrentBudgetFinalized();
  }

  onBudgetFinalized() {
    return this.refreshIsCurrentBudgetFinalized();
  }

}
