import { async, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ HomeComponent ]
    });

    component = TestBed.get(HomeComponent);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
