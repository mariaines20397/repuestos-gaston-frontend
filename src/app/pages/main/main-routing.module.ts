import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path:'', 
    component:MainComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:'home', 
        loadChildren:() => import('./home/home.module').then((m)=> m.HomeModule)
      },
      {
        path:'products',
        loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
        // canActivate:[AuthGuard],
      },
      {
        path:'users/profile',
        loadChildren:() => import('./user/user.module').then((m)=> m.UserModule),
        // canActivate:[AuthGuard],
      },
      {
        path:'search',
        loadChildren:() => import('./products/products.module').then((m)=> m.ProductsModule),
        // canActivate:[AuthGuard],
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
