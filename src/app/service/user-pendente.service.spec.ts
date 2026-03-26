import { TestBed } from '@angular/core/testing';

import { UserPendenteService } from './user-pendente.service';

describe('UserPendenteService', () => {
  let service: UserPendenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPendenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
