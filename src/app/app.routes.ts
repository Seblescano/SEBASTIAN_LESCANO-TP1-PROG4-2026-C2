import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard'; // Verificá que la ruta de importación sea correcta

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/registro/registro').then(m => m.RegistroComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'butacas',
    loadComponent: () => import('./pages/butacas/butacas').then(m => m.ButacasComponent)  
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then(m => m.AdminComponent),
    canActivate: [adminGuard] // candado 
  },
  {
    path: 'acceso-denegado',
    loadComponent: () => import('./pages/acceso-denegado/acceso-denegado').then(m => m.AccesoDenegado)
  },
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full'
  }
  
];