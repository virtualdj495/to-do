import { TestBed } from '@angular/core/testing';

import { MyGuard } from './my.guard';

describe('MyGuardGuard', () => {
  let guard: MyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
