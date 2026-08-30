import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/pages/home/home.component').then(m => m.HomePage)
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/landing/components/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
