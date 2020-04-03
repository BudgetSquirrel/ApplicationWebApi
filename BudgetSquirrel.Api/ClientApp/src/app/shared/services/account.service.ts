import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { User, EMPTY_USER } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    this.userSubject = new BehaviorSubject(EMPTY_USER);
 }


}
