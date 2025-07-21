import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';
import { authRoleGuard } from './role.guard';


describe('roleGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
