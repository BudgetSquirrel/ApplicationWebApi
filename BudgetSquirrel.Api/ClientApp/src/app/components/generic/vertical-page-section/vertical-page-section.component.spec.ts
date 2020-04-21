import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalPageSectionComponent } from './vertical-page-section.component';

describe('VerticalPageSectionComponent', () => {
  let component: VerticalPageSectionComponent;
  let fixture: ComponentFixture<VerticalPageSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalPageSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalPageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
