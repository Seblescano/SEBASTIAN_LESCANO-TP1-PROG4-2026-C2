import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro').then(m => m.RegistroComponent)
  },
  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  }
];