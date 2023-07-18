import { TestBed } from '@angular/core/testing';

import { TheatreResolverGuard } from './theatre-resolver.guard';

describe('TheatreResolverGuard', () => {
  let guard: TheatreResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TheatreResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
