import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { MainLayout } from './shared/layouts/main-layout/main-layout';

export const routes: Routes = [
  // Redirect raiz
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Auth (sem guard)
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
        title: 'Login'
      }
    ]
  },

  // Área Principal Protegida
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
        title: 'Dashboard'
      },
      {
        path: 'project/:projectId',
        loadChildren: () => import('./features/project/project.routes').then(m => m.PROJECT_ROUTES),
        data: { preload: true }
      },
      {
        path: 'members',
        loadComponent: () => import('./features/members/members').then(m => m.Members),
        title: 'Membros'
      },
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
      },
      {
        path: 'admin',
        canActivate: [roleGuard('admin')],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
      }
    ]
  },

  // 404
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound),
    title: 'Página não encontrada'
  }
];
