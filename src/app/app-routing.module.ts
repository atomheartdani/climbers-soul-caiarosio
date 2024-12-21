import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'about', loadComponent: () => import('./about/about.component').then((c) => c.AboutComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
  {
    path: 'register',
    loadChildren: () => import('./self-registration/self-registration.module').then((m) => m.SelfRegistrationModule),
  },
  { path: 'rules', loadComponent: () => import('./rules/rules.component').then((c) => c.RulesComponent) },
  { path: 'scheduler', loadChildren: () => import('./scheduler/scheduler.module').then((m) => m.SchedulerModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
