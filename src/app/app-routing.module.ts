import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
    { path: 'scheduler', loadChildren: () => import('./scheduler/scheduler.module').then((m) => m.SchedulerModule) },
    { path: 'rules', loadChildren: () => import('./rules/rules.module').then((m) => m.RulesModule) },
    { path: 'users', loadChildren: () => import('./users/users.module').then((m) => m.UsersModule) },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
