import { TestBed } from '@angular/core/testing';

import { DashboardGuard } from './dashboard.guard';

describe('DashboardGuardGuard', () => {
  let guard: DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
