import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, RedirectCommand } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('authGuard', () => {
  let authServiceMock: { isAuthenticated: any };
  let routerMock: { createUrlTree: any };

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: vi.fn()
    };
    routerMock = {
      createUrlTree: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('should allow navigation if user is authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('should redirect to /login if user is not authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);
    const urlTreeMock = {} as UrlTree;
    routerMock.createUrlTree.mockReturnValue(urlTreeMock);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).toBeInstanceOf(RedirectCommand);
    expect((result as RedirectCommand).redirectTo).toBe(urlTreeMock);
  });
});
