import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Budget, DurationType } from "../models";
import { Observable } from "rxjs";

const BUDGETS_API = "api/budget";

export interface EditDurationRequest {
  endDayOfMonth?: number;
  rolloverEndDate?: boolean;
  durationType: DurationType;
  numberDays?: number;
}

interface ApiCommandResponse {
  success: boolean;
}

@Injectable({
  providedIn: "root"
})
export class BudgetApi {

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

  public editBudgetName(budget: Budget, newName: string): Promise<ApiCommandResponse> {
    const requestBody = {
      budgetId: budget.id,
      name: newName
    };
    return this.http.patch(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  public editBudgetSetAmount(budget: Budget, setAmount: number): Promise<ApiCommandResponse> {
    const requestBody = {
      budgetId: budget.id,
      setAmount
    };
    return this.http.patch(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  public createBudget(parentBudget: Budget, name: string, setAmount: number): Promise<ApiCommandResponse> {
    const requestBody = {
      parentBudgetId: parentBudget.id,
      name,
      setAmount
    }
    return this.http.post(`${this.baseUrl}${BUDGETS_API}/budget`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }

  public removeBudget(budget: Budget): Promise<ApiCommandResponse> {
    return this.http.delete(`${this.baseUrl}${BUDGETS_API}/budget/${budget.id}`).toPromise() as Promise<ApiCommandResponse>;
  }

  public editDuration(budget: Budget, request: EditDurationRequest): Promise<ApiCommandResponse> {
    const requestBody = {
      budgetId: budget.id,
      ...request
    };
    return this.http.patch(`${this.baseUrl}${BUDGETS_API}/duration`, requestBody).toPromise() as Promise<ApiCommandResponse>;
  }
}
