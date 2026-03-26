import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculoTemplateComponent } from './curriculo-template.component';

describe('CurriculoTemplateComponent', () => {
  let component: CurriculoTemplateComponent;
  let fixture: ComponentFixture<CurriculoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
