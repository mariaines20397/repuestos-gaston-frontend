import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeAdminComponent } from './homeAdmin/homeAdmin.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { ProductComponent } from './table-products/product/product.component';
import { UserComponent } from './table-users/user/user.component';
import { TableSalesComponent } from './table-sales/table-sales.component';
import { SaleComponent } from './table-sales/sale/sale.component';
import { CategoryComponent } from './table-categories/category/category.component';
import { TableCategoriesComponent } from './table-categories/table-categories.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

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
        path:'product', 
        component: TableProductsComponent
      },
      {
        path:'product/edit/:id', 
        component: ProductComponent
      },
      {
        path:'product/add', 
        component: ProductComponent
      },
      {
        path:'product/view/:id', 
        component: ProductComponent
      },
      {
        path:'category', 
        component: TableCategoriesComponent
      },
      {
        path:'category/edit/:id', 
        component: CategoryComponent
      },
      {
        path:'category/add', 
        component: CategoryComponent
      },
      {
        path:'category/view/:id', 
        component: CategoryComponent
      },
      {
        path:'ventas', 
        component: TableSalesComponent
      },
      {
        path:'user', 
        component: TableUsersComponent
      },
      {
        path:'user/view/:id', 
        component: UserComponent
      },
      {
        path:'ventas/ver/:id', 
        component: SaleComponent
      },
      {
        path:'ventas/editarVenta/:id', 
        component: SaleComponent
      },
      
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
