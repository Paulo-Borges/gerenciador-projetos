import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    title: 'Perfil'
  },
  {
    path: 'billing',
    loadComponent: () => import('./billing/billing.component').then(m => m.BillingComponent),
    title: 'Faturamento'
  }
];
