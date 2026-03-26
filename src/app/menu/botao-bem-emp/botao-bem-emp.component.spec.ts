import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoBemEmpComponent } from './botao-bem-emp.component';

describe('BotaoBemEmpComponent', () => {
  let component: BotaoBemEmpComponent;
  let fixture: ComponentFixture<BotaoBemEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoBemEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoBemEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
