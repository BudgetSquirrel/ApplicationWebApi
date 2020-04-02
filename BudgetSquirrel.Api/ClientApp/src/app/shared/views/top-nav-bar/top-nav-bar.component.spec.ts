import { async, TestBed } from "@angular/core/testing";
import { TopNavBarComponent } from "./top-nav-bar.component";

describe("TopNavBarComponent", () => {
  let component: TopNavBarComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ TopNavBarComponent ]
    });

    component = TestBed.get(TopNavBarComponent);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
