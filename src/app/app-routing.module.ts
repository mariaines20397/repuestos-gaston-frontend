import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./pages/login/login.module').then((m)=> m.LoginModule),
    // canActivate:[AuthGuard],
  },
   {
    path:'main',
    loadChildren:()=> import('./pages/main/main.module').then((m)=> m.MainModule),
    // canActivate:[MainGuard],
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
