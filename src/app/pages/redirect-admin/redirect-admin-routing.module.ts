import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectAdminComponent } from './redirect-admin.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path:'', 
    component:RedirectAdminComponent
  },
  {
    path:'dashboard',
    loadChildren:()=> import('../admin/admin.module').then((m)=> m.AdminModule),
    canActivate:[AdminGuard],
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectAdminRoutingModule { }
