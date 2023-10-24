import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'login',
    loadChildren:()=> import('./pages/login/login.module').then((m)=> m.LoginModule),
    // canActivate:[AuthGuard],
  },
  {
    path:'register',
    loadChildren:()=> import('./pages/register/register.module').then((m)=> m.RegisterModule),
    // canActivate:[AuthGuard],
  },
   {
    path:'',
    loadChildren:()=> import('./pages/main/main.module').then((m)=> m.MainModule),
    // canActivate:[MainGuard],
   },
   {
    path:'admin',
    loadChildren:()=> import('./pages/redirect-admin/redirect-admin.module').then((m)=> m.RedirectAdminModule),
    // canActivate:[MainGuard],
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
