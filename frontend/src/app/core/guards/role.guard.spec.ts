import { TestBed } from '@angular/core/testing';
import { Router, UrlTree, RedirectCommand } from '@angular/router';
import { roleGuard } from './role.guard';
import { AuthManager } from '../services/auth-manager';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('roleGuard', () => {
  let authManagerMock: { user: any };
  let routerMock: { createUrlTree: any };

  beforeEach(() => {
    authManagerMock = {
      user: vi.fn()
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

  it('should allow navigation if user has required role', () => {
    authManagerMock.user.mockReturnValue({ id: 'u1', name: 'Felipe', role: 'admin' });

    const guard = roleGuard('admin');
    const result = TestBed.runInInjectionContext(() => guard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it('should redirect if user does not have required role', () => {
    authManagerMock.user.mockReturnValue({ id: 'u2', name: 'Ana', role: 'member' });
    const urlTreeMock = {} as UrlTree;
    routerMock.createUrlTree.mockReturnValue(urlTreeMock);

    const guard = roleGuard('admin');
    const result = TestBed.runInInjectionContext(() => guard({} as any, {} as any));

    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/workspace', 'w1', 'dashboard']);
    expect(result).toBeInstanceOf(RedirectCommand);
    expect((result as RedirectCommand).redirectTo).toBe(urlTreeMock);
  });
});
