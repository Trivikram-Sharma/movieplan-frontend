import { TestBed } from '@angular/core/testing';

import { SearchListResolverGuard } from './search-list-resolver.guard';

describe('SearchListResolverGuard', () => {
  let guard: SearchListResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SearchListResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
