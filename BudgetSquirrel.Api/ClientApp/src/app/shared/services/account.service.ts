import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, EMPTY_USER } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { tap, share } from "rxjs/operators";
import { Credentials } from "../interfaces/accounts.interface";

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

  public get(): Observable<User> {
    return this.userSubject.asObservable().pipe(share());
  }

  public deleteUser(): Promise<any> {
    return this.http.delete(`${this.baseUrl}${AUTHENTICATION_API}`).toPromise();
  }

  public logout(): Promise<any> {
    return this.http.get(`${this.baseUrl}${AUTHENTICATION_API}/logout`).toPromise();
  }

  public isAuthenticated(): boolean {
    return !(this.userSubject.value === EMPTY_USER);
  }
}
