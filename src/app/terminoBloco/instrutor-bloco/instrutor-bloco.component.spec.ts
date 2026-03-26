import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrutorBlocoComponent } from './instrutor-bloco.component';

describe('InstrutorBlocoComponent', () => {
  let component: InstrutorBlocoComponent;
  let fixture: ComponentFixture<InstrutorBlocoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrutorBlocoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrutorBlocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
