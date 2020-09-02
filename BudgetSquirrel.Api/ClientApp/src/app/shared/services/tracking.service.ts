import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CurrentBudgetPeriod, nullCurrentBudgetPeriod } from '../models/tracking';

const TRACKING_API = "api/tracking";

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private currentBudgetPeriodSubject: BehaviorSubject<CurrentBudgetPeriod>;

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    this.currentBudgetPeriodSubject = new BehaviorSubject(nullCurrentBudgetPeriod);
  }

  public getCurrentBudgetPeriod(): Observable<CurrentBudgetPeriod> {
    return this.http.get<CurrentBudgetPeriod>(`${this.baseUrl}${TRACKING_API}/current-period`).pipe(
      tap((budgetPeriod: CurrentBudgetPeriod) => this.currentBudgetPeriodSubject.next(budgetPeriod))
    );
  }
}
