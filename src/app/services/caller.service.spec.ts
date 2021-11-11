import { TestBed } from '@angular/core/testing';

import { CallerService } from './caller.service';

describe('CallerService', () => {
  let service: CallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
