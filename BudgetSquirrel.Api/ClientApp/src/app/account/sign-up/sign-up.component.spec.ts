import { async, TestBed } from "@angular/core/testing";
import { SignUpComponent } from "./sign-up.component";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ SignUpComponent ]
    });

    component = TestBed.get(SignUpComponent);
  }));


  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
