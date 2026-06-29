import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';

// const routes: Routes = [
//   { path: 'login', loadComponent()=> import('./features/auth/login/login.component').then(m=>m.LoginComponent)},
//   {path: 'dashboard', loadComponent}
//   // { path: 'signup', component: LoginComponent },
//   // { path: 'dashboard', component: DashboardComponent },
//   // { path: '', redirectTo: 'login', pathMatch: 'full' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })

// export class AppRoutingModule {}

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
];
