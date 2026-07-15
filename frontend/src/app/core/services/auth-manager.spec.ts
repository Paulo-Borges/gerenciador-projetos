import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthManager } from './auth-manager';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthManager', () => {
  let service: AuthManager;
  let httpMock: HttpTestingController;
  let routerMock: { navigate: any };

  beforeEach(() => {
    routerMock = { navigate: vi.fn() };
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        AuthManager,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.inject(AuthManager);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created and initially unauthenticated', () => {
    expect(service).toBeTruthy();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
  });

  it('should authenticate user on successful login', () => {
    const mockResponse = {
      token: 'fake-jwt-token',
      user: { id: 'u1', name: 'Felipe', email: 'felipe@example.com', role: 'admin' as const }
    };

    service.login('felipe@example.com').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isAdmin()).toBe(true);
    expect(service.getToken()).toBe('fake-jwt-token');
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
  });

  it('should clear data and navigate to /login on logout', () => {
    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
