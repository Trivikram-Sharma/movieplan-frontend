import { TestBed } from '@angular/core/testing';

import { AddTicketResolverGuard } from './add-ticket-resolver.guard';

describe('AddTicketResolverGuard', () => {
  let guard: AddTicketResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddTicketResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
