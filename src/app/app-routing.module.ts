import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate:[authGuard]
  },
  {
    path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
