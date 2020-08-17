import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddBudgetFormComponent } from "./add-budget-form.component";

describe("AddBudgetFormComponent", () => {
  let component: AddBudgetFormComponent;
  let fixture: ComponentFixture<AddBudgetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBudgetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBudgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
