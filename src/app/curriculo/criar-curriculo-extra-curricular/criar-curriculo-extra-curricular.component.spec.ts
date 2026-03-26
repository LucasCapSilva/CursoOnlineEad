import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCurriculoExtraCurricularComponent } from './criar-curriculo-extra-curricular.component';

describe('CriarCurriculoExtraCurricularComponent', () => {
  let component: CriarCurriculoExtraCurricularComponent;
  let fixture: ComponentFixture<CriarCurriculoExtraCurricularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarCurriculoExtraCurricularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCurriculoExtraCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
