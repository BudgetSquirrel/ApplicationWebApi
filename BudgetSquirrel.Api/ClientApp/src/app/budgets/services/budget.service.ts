import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BudgetService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
  }
}
