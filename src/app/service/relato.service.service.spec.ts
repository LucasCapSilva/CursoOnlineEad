import { TestBed } from '@angular/core/testing';

import { Relato.ServiceService } from './relato.service.service';

describe('Relato.ServiceService', () => {
  let service: Relato.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Relato.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
