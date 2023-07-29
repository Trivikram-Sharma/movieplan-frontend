import { TestBed } from '@angular/core/testing';

import { EditTicketResolverGuard } from './edit-ticket-resolver.guard';

describe('EditTicketResolverGuard', () => {
  let guard: EditTicketResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditTicketResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
