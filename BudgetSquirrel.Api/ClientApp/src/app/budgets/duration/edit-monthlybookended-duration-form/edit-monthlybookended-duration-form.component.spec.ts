import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonthlybookendedDurationFormComponent } from './edit-monthlybookended-duration-form.component';

describe('EditMonthlybookendedDurationFormComponent', () => {
  let component: EditMonthlybookendedDurationFormComponent;
  let fixture: ComponentFixture<EditMonthlybookendedDurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMonthlybookendedDurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMonthlybookendedDurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
