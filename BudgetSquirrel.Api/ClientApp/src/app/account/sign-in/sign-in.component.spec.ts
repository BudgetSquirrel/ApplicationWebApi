import { async, TestBed } from "@angular/core/testing";
import { SignInComponent } from "./sign-in.component";
import { AccountServiceStub } from "src/tests/ServiceStubs.spec";
import { AccountService } from "src/app/shared/services/account.service";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let accountServiceStub: AccountServiceStub;

  beforeEach(async(() => {
    accountServiceStub = new AccountServiceStub();

    TestBed.configureTestingModule({
      providers: [ SignInComponent,
      { provide: AccountService, useValue: accountServiceStub} ]
    });

    component = TestBed.get(SignInComponent);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
