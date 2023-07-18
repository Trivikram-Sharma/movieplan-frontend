import { TestBed } from '@angular/core/testing';

import { AddScreeningResolveGuard } from './add-screening-resolve.guard';

describe('AddScreeningResolveGuard', () => {
  let guard: AddScreeningResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddScreeningResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
