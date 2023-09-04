import { TestBed } from '@angular/core/testing';

import { TicketListResolverGuard } from './ticket-list-resolver.guard';

describe('TicketListResolverGuard', () => {
  let guard: TicketListResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TicketListResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
