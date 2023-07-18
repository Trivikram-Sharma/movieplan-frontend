import { TestBed } from '@angular/core/testing';

import { AddressResolverGuard } from './address-resolver.guard';

describe('AddressResolverGuard', () => {
  let guard: AddressResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddressResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
