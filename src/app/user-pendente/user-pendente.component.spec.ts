import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPendenteComponent } from './user-pendente.component';

describe('UserPendenteComponent', () => {
  let component: UserPendenteComponent;
  let fixture: ComponentFixture<UserPendenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPendenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
