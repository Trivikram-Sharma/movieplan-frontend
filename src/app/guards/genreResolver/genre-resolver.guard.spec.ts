import { TestBed } from '@angular/core/testing';

import { GenreResolverGuard } from './genre-resolver.guard';

describe('GenreResolverGuard', () => {
  let guard: GenreResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GenreResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
