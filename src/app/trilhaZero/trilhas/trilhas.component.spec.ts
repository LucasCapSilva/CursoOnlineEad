import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrilhasComponent } from './trilhas.component';

describe('TrilhasComponent', () => {
  let component: TrilhasComponent;
  let fixture: ComponentFixture<TrilhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrilhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrilhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
