import { Routes } from '@angular/router';
import { usersResolver } from '../../core/resolvers/users-resolver';
import { auditLogResolver } from '../../core/resolvers/audit-log-resolver';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () => import('./users/users').then(m => m.Users),
    resolve: { users: usersResolver },
    title: 'Usuários'
  },
  {
    path: 'audit-log',
    loadComponent: () => import('./audit-log/audit-log').then(m => m.AuditLog),
    resolve: { logs: auditLogResolver },
    title: 'Audit Log'
  }
];
