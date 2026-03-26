import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrintCurriruloComponent } from './view-print-currirulo.component';

describe('ViewPrintCurriruloComponent', () => {
  let component: ViewPrintCurriruloComponent;
  let fixture: ComponentFixture<ViewPrintCurriruloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrintCurriruloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrintCurriruloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
