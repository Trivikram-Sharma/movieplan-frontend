import { TestBed } from '@angular/core/testing';

import { ServiceResolverGuard } from './service-resolver.guard';

describe('ServiceResolverGuard', () => {
  let guard: ServiceResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
