import { Routes } from '@angular/router';
import { SelfRegistrationGuard } from './@shared/guards/self-registration.guard';

export const routes: Routes = [
  { path: 'about', loadComponent: () => import('./about/about.component').then((c) => c.AboutComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent) },
  {
    path: 'register',
    loadComponent: () =>
      import('./self-registration/self-registration.component').then((c) => c.SelfRegistrationComponent),
    canActivate: [SelfRegistrationGuard],
  },
  { path: 'rules', loadComponent: () => import('./rules/rules.component').then((c) => c.RulesComponent) },
  {
    path: 'scheduler',
    loadComponent: () => import('./scheduler/scheduler.component').then((c) => c.SchedulerComponent),
  },
  {
    path: 'updatePassword',
    loadComponent: () =>
      import('./auth/update-password/update-password.component').then((c) => c.UpdatePasswordComponent),
  },
  { path: 'users', loadComponent: () => import('./users/users.component').then((c) => c.UsersComponent) },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home' },
];
