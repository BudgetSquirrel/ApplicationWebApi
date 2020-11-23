import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Fund } from './models';

const TRACKING_API = "api/tracking";

@Injectable({
  providedIn: 'root'
})
export class TrackingApiService {

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) { }

  async getCurrentRootFund(): Promise<Fund> {
    const now = new Date();
    const fundResponse = await this.http.get(`${this.baseUrl}${TRACKING_API}/root-fund`, {
      params: {
        date: now.toLocaleDateString()
      }
    }).toPromise();

    return fundResponse as Fund;
  }
}
