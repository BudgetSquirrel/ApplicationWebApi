import { async, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./sign-up.component";
import { AccountService } from "src/app/shared/services/account.service";
import { AccountServiceStub } from "src/tests/ServiceStubs.spec";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let accountServiceStub: AccountServiceStub;
  beforeEach(async(() => {
    accountServiceStub = new AccountServiceStub();

    TestBed.configureTestingModule({
      providers: [ SignUpComponent,
        { provide: AccountService, useValue: accountServiceStub} ]
    });

    component = TestBed.get(SignUpComponent);
  }));


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
