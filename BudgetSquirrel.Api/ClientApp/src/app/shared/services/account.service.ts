import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, EMPTY_USER } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { tap, share, map } from "rxjs/operators";
import { Credentials, NewUser } from "../interfaces/accounts.interface";

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

  public getUser(): Observable<User> {
    if (this.userSubject.value === EMPTY_USER) {
      const a = this.getUserFromApi().pipe(
        map((user: User) => {
          this.userSubject.next(user);
          return this.userSubject;
        })
      );
      return a;
    } else {
      return this.userSubject.asObservable().pipe(share());
    }
  }

  public deleteUser(): Promise<any> {
    return this.http.delete(`${this.baseUrl}${AUTHENTICATION_API}`).toPromise();
  }

  public logout(): Promise<User> {
    return this.http.get(`${this.baseUrl}${AUTHENTICATION_API}/logout`).pipe(
      tap((user: User) => this.userSubject.next(EMPTY_USER))
    ).toPromise();
  }

  public createUser(newUser: NewUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${AUTHENTICATION_API}/create`, newUser).pipe(
      tap((user: User) => this.userSubject.next(user))
    );
  }

  private getUserFromApi() {
    return this.http.get<User>(`${this.baseUrl}${AUTHENTICATION_API}/me`);
  }
}
