import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditDurationFormComponent } from "./edit-duration-form.component";

describe("EditDurationFormComponent", () => {
  let component: EditDurationFormComponent;
  let fixture: ComponentFixture<EditDurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
