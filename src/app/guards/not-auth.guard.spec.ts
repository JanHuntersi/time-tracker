import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { NotAuthGuard } from './not-auth.guard';

describe('NotAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => NotAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
