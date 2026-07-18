import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AuthManager } from '../services/auth-manager';

export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const authManager = inject(AuthManager);
    const router = inject(Router);
    const user = authManager.user();

    if (user?.role === requiredRole) {
      return true;
    }

    const urlTree = router.createUrlTree(['/dashboard']);
    return new RedirectCommand(urlTree, { replaceUrl: true });
  };
}
