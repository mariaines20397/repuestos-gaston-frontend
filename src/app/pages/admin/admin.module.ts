import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeAdminComponent } from './homeAdmin/homeAdmin.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { AdminComponent } from './admin.component';
import { NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './table-products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './table-users/user/user.component';
import { TableSalesComponent } from './table-sales/table-sales.component';
import { SaleComponent } from './table-sales/sale/sale.component';
import { TableCategoriesComponent } from './table-categories/table-categories.component';
import { CategoryComponent } from './table-categories/category/category.component';


@NgModule({
  declarations: [
    AdminComponent,
    HomeAdminComponent,
    TableProductsComponent,
    TableUsersComponent,
    ProductComponent,
    UserComponent,
    TableSalesComponent,
    SaleComponent,
    TableCategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbTypeaheadModule
  ]
})
export class AdminModule { }
