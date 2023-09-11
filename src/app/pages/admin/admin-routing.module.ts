import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:'', 
    component:AdminComponent,
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path:'dashboard', 
        loadChildren:() => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule)
      },
      // {
      //   path:'products',
      //   loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
      //   // canActivate:[AuthGuard],
      // },
      // {
      //   path:'users/profile',
      //   loadChildren:() => import('./user/user.module').then((m)=> m.UserModule),
      //   // canActivate:[AuthGuard],
      // },
      // {
      //   path:'search',
      //   loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
      //   // canActivate:[AuthGuard],
      // }
      // ,
      // {
      //   path:'carrito',
      //   loadChildren:() => import('./carrito/carrito.module').then((m)=> m.CarritoModule),
      //   // canActivate:[AuthGuard],
      // }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
