import { TestBed } from '@angular/core/testing';

import { ScreeningListResolveGuard } from './screening-list-resolve.guard';

describe('ScreeningListResolveGuard', () => {
  let guard: ScreeningListResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScreeningListResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
