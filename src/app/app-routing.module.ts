import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'about', loadComponent: () => import('./about/about.component').then((c) => c.AboutComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent) },
  {
    path: 'register',
    loadChildren: () => import('./self-registration/self-registration.module').then((m) => m.SelfRegistrationModule),
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

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
