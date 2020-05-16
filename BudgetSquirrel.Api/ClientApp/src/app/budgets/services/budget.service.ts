import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Budget } from '../models';
import { Observable } from 'rxjs';

const BUDGETS_API = "api/budgets";

@Injectable({
  providedIn: "root"
})
export class BudgetService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
  }

  getRootBudget(): Observable<Budget> {
    return this.http.get(`${this.baseUrl}${BUDGETS_API}/root-budget`).pipe(
      map((budget: Budget) => {
        budget.budgetStart = new Date(budget.budgetStart);
        return budget;
      })
    );
  }
}
