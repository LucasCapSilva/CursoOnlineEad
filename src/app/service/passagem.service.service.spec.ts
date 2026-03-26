import { TestBed } from '@angular/core/testing';

import { Passagem.ServiceService } from './passagem.service.service';

describe('Passagem.ServiceService', () => {
  let service: Passagem.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Passagem.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
