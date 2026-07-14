import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    title: 'Usuários'
  },
  {
    path: 'audit-log',
    loadComponent: () => import('./audit-log/audit-log.component').then(m => m.AuditLogComponent),
    title: 'Audit Log'
  }
];
