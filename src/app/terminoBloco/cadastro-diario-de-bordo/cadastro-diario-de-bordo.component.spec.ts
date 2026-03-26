import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDiarioDeBordoComponent } from './cadastro-diario-de-bordo.component';

describe('CadastroDiarioDeBordoComponent', () => {
  let component: CadastroDiarioDeBordoComponent;
  let fixture: ComponentFixture<CadastroDiarioDeBordoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDiarioDeBordoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDiarioDeBordoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
