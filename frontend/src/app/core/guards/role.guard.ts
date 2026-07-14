import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AuthService } from '../services/auth.service';

export function roleGuard(requiredRole: string): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.user();

    if (user?.role === requiredRole) {
      return true;
    }

    const urlTree = router.createUrlTree(['/workspace', 'w1', 'dashboard']);
    return new RedirectCommand(urlTree, { replaceUrl: true });
  };
}
