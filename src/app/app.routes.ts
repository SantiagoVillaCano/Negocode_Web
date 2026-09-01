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
    path: 'tecnologia',
    loadComponent: () => import('./features/landing/components/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/landing/components/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

