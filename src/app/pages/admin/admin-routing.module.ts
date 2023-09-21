import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './homeAdmin/homeAdmin.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { ProductComponent } from './table-products/product/product.component';
import { UserComponent } from './table-users/user/user.component';

const routes: Routes = [
  {
    path:'', 
    component:AdminComponent,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path:'home', 
        component: HomeAdminComponent
      },
      {
        path:'productos', 
        component: TableProductsComponent
      },
      {
        path:'usuarios', 
        component: TableUsersComponent
      },
      {
        path:'productos/agregarProducto', 
        component: ProductComponent
      },
      {
        path:'productos/editarProducto/:id', 
        component: ProductComponent
      },
      {
        path:'usuarios/ver/:id', 
        component: UserComponent
      },
      
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
