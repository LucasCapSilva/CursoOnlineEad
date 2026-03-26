import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroOcorrenciasComponent } from './cadastro-ocorrencias.component';

describe('CadastroOcorrenciasComponent', () => {
  let component: CadastroOcorrenciasComponent;
  let fixture: ComponentFixture<CadastroOcorrenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroOcorrenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroOcorrenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
