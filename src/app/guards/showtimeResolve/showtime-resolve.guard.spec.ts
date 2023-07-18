import { TestBed } from '@angular/core/testing';

import { ShowtimeResolveGuard } from './showtime-resolve.guard';

describe('ShowtimeResolveGuard', () => {
  let guard: ShowtimeResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShowtimeResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
