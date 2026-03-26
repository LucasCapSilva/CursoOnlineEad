import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCurriculoAllComponent } from './view-curriculo-all.component';

describe('ViewCurriculoAllComponent', () => {
  let component: ViewCurriculoAllComponent;
  let fixture: ComponentFixture<ViewCurriculoAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCurriculoAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCurriculoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
