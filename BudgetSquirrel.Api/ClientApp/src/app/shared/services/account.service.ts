import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, EMPTY_USER } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { NewUser, Credentials } from "../interfaces/accounts.interface";

const ACCOUNT_API = "api/account";
const AUTHENTICATION_API = "api/authentication";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    this.userSubject = new BehaviorSubject(EMPTY_USER);
 }

  public login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${AUTHENTICATION_API}/login`, credentials).pipe(
      tap((user: User) => this.userSubject.next(user))
    );
  }

  // public createUser(newUser: NewUser): Observable<User> {

  // }

}
