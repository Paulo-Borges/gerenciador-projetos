import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, RedirectCommand } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthManager } from '../services/auth-manager';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('authGuard', () => {
  let authManagerMock: { isAuthenticated: any };
  let routerMock: { createUrlTree: any };

  beforeEach(() => {
    authManagerMock = {
      isAuthenticated: vi.fn()
    };
    routerMock = {
      createUrlTree: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should allow navigation if user is authenticated', () => {
    authManagerMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('should redirect to /login if user is not authenticated', () => {
    authManagerMock.isAuthenticated.mockReturnValue(false);
    const urlTreeMock = {} as UrlTree;
    routerMock.createUrlTree.mockReturnValue(urlTreeMock);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBeInstanceOf(RedirectCommand);
    expect((result as RedirectCommand).redirectTo).toBe(urlTreeMock);
  });
});
