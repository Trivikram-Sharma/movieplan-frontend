import { TestBed } from '@angular/core/testing';

import { PurchaseHistoryResolverGuard } from './purchase-history-resolver.guard';

describe('PurchaseHistoryResolverGuard', () => {
  let guard: PurchaseHistoryResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PurchaseHistoryResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
