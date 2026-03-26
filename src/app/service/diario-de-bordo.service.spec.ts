import { TestBed } from '@angular/core/testing';

import { DiarioDeBordoService } from './diario-de-bordo.service';

describe('DiarioDeBordoService', () => {
  let service: DiarioDeBordoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiarioDeBordoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
