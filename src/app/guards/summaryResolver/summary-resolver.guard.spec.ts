import { TestBed } from '@angular/core/testing';

import { SummaryResolverGuard } from './summary-resolver.guard';

describe('SummaryResolverGuard', () => {
  let guard: SummaryResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SummaryResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
