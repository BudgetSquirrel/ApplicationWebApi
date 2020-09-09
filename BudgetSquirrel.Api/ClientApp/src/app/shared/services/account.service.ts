import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap, share } from "rxjs/operators";
import { Credentials, NewUser, User, nullUser } from "../models/accounts";

const AUTHENTICATION_API = "api/authentication";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
    this.userSubject = new BehaviorSubject(nullUser);
  }

  public login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${AUTHENTICATION_API}/login`, credentials).pipe(
      tap((user: User) => this.userSubject.next(user))
    );
  }

  public getUser(): Observable<User> {
    if (this.userSubject.value === nullUser) {
      this.getUserFromApi().subscribe((user: User) => {
        this.userSubject.next(user);
      },
      e => {
        this.userSubject.next(nullUser);
      });
    }
    return this.userSubject.asObservable().pipe(share());
  }

  public deleteUser(): Promise<any> {
    return this.http.delete(`${this.baseUrl}${AUTHENTICATION_API}`).toPromise();
  }

  public logout()  {
    this.userSubject.next(nullUser);

    this.http.get(`${this.baseUrl}${AUTHENTICATION_API}/logout`).toPromise().then(() => {
      console.log("Logged out");
    });
  }

  public createUser(newUser: NewUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${AUTHENTICATION_API}/create`, newUser).pipe(
      tap((user: User) => this.userSubject.next(user))
    );
  }

  public isAuthenticated(): boolean {
    return !(this.userSubject.value === nullUser);
  }

  private getUserFromApi() {
    return this.http.get<User>(`${this.baseUrl}${AUTHENTICATION_API}/me`);
  }
}
