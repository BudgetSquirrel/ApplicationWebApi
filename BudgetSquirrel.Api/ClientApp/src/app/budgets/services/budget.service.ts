import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Budget } from "../models";
import { Observable } from "rxjs";

const BUDGETS_API = "api/budgets";

interface ApiCommandResponse {
  success: boolean;
}

@Injectable({
  providedIn: "root"
})
export class BudgetService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
  }

  public getRootBudget(): Observable<Budget> {
    return this.http.get(`${this.baseUrl}${BUDGETS_API}/root-budget`).pipe(
      map((budget: Budget) => {
        budget.budgetStart = new Date(budget.budgetStart);
        return budget;
      })
    );
  }

  public editRootBudgetName(budget: Budget, newName: string): Promise<ApiCommandResponse> {
    const requestBody = {
      budgetId: budget.id,
      name: newName
    };
    return this.http.patch(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  public editRootBudgetSetAmount(budget: Budget, setAmount: number): Promise<ApiCommandResponse> {
    const requestBody = {
      budgetId: budget.id,
      setAmount
    };
    return this.http.patch(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  createBudget(parentBudget: Budget, name: string, setAmount: number): Promise<ApiCommandResponse> {
    const requestBody = {
      parentBudgetId: parentBudget.id,
      name,
      setAmount
    }
    return this.http.post(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  removeBudget(budget: Budget): Promise<ApiCommandResponse> {
    return this.http.delete(`${this.baseUrl}${BUDGETS_API}/budget/${budget.id}`).toPromise() as Promise<ApiCommandResponse>;
  }
}
