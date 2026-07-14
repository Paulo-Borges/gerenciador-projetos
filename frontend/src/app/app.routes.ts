import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  // Redirect raiz
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Auth (sem guard)
  {
    path: '',
    component: AuthLayoutComponent,
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
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
      },
      {
        path: 'project/:projectId',
        loadChildren: () => import('./features/project/project.routes').then(m => m.PROJECT_ROUTES),
        data: { preload: true }
      },
      {
        path: 'members',
        loadComponent: () => import('./features/members/members.component').then(m => m.MembersComponent),
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
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página não encontrada'
  }
];
