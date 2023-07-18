import { TestBed } from '@angular/core/testing';

import { MovieResolveGuard } from './movie-resolve.guard';

describe('MovieResolveGuard', () => {
  let guard: MovieResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MovieResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
