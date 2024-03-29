import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RedirectAdminComponent } from './redirect-admin.component';

const routes: Routes = [
  {
    path:'', 
    component:RedirectAdminComponent
  },
  {
    path:'dashboard',
    loadChildren:()=> import('../admin/admin.module').then((m)=> m.AdminModule),
    // canActivate:[MainGuard],
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectAdminRoutingModule { }
