import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

const CONTEXT_API = "api/context";

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
  }

  async isCurrentBudgetFinalized(): Promise<boolean> {
    const response: { isFinalized: boolean } = <{ isFinalized: boolean }> (await this.http.get(`${this.baseUrl}${CONTEXT_API}/is-current-budget-finalized`).toPromise());
    return response.isFinalized;
  }
}
