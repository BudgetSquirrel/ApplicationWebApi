import { Component, OnInit } from "@angular/core";
import { AppContextService } from 'src/app/shared/services/app-context.service';

@Component({
  selector: "bs-home",
  template: `
    <!-- Unauthenticated -->
    <bs-splash-page *isAuthenticated="false"></bs-splash-page>

    <!-- Authenticated -->
    <ng-template [ngIf]="!this.isCurrentBudgetFinalized" [ngIfElse]="trackingHome">
      <bs-budget-overview *isAuthenticated="true" (onBudgetFinalized)="this.onBudgetFinalized()"></bs-budget-overview>
    </ng-template>
    <ng-template #trackingHome>
      Transaction tracking view for finalized budget
    </ng-template>
  `,
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  public isCurrentBudgetFinalized: boolean = false;

  constructor(private appContextService: AppContextService) { }

  ngOnInit() {
    this.refreshIsCurrentBudgetFinalized();
  }

  async refreshIsCurrentBudgetFinalized() {
    this.isCurrentBudgetFinalized = await this.appContextService.isCurrentBudgetFinalized();
  }

  onBudgetFinalized() {
    return this.refreshIsCurrentBudgetFinalized();
  }

}
