import { TestBed } from '@angular/core/testing';

import { UserInfo.ServiceService } from './user-info.service.service';

describe('UserInfo.ServiceService', () => {
  let service: UserInfo.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfo.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
