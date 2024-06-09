import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MainGuard } from 'src/app/core/guards/main.guard';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path:'', 
    component:MainComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path:'home', 
        loadChildren:() => import('./home/home.module').then((m)=> m.HomeModule),
      },
      {
        path:'products',
        loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
      },
      {
        path:'users/profile',
        loadChildren:() => import('./user/user.module').then((m)=> m.UserModule),
        canActivate:[AuthGuard],
      },
      {
        path:'search/:filtrar',
        loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
      }
      ,
      {
        path:'carrito',
        loadChildren:() => import('./carrito/carrito.module').then((m)=> m.CarritoModule),
        canActivate:[AuthGuard],
      },
      {
        path:'login',
        loadChildren:()=> import('../login/login.module').then((m)=> m.LoginModule),
        canActivate:[MainGuard],
      },
      {
        path:'register',
        loadChildren:()=> import('../register/register.module').then((m)=> m.RegisterModule),
        canActivate:[MainGuard],
      },
    ]
  },
  {
   path:'admin',
   loadChildren:()=> import('../redirect-admin/redirect-admin.module').then((m)=> m.RedirectAdminModule),
  canActivate:[AdminGuard]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
