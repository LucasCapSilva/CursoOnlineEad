import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoBESComponent } from './tecnico-bes.component';

describe('TecnicoBESComponent', () => {
  let component: TecnicoBESComponent;
  let fixture: ComponentFixture<TecnicoBESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicoBESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicoBESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
