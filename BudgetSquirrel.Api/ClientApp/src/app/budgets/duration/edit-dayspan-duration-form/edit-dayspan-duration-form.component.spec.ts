import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDayspanDurationFormComponent } from './edit-dayspan-duration-form.component';

describe('EditDayspanDurationFormComponent', () => {
  let component: EditDayspanDurationFormComponent;
  let fixture: ComponentFixture<EditDayspanDurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDayspanDurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDayspanDurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
