import { TestBed } from '@angular/core/testing';

import { CowinService } from './cowin.service';

describe('CowinService', () => {
  let service: CowinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CowinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
