import { TestBed } from '@angular/core/testing';

import { InstrutorBlocoServiceService } from './instrutor-bloco-service.service';

describe('InstrutorBlocoServiceService', () => {
  let service: InstrutorBlocoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstrutorBlocoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
