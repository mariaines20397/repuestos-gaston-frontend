import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeAdminComponent } from './homeAdmin/homeAdmin.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { TableUsersComponent } from './table-users/table-users.component';
import { AdminComponent } from './admin.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './table-products/product/product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    HomeAdminComponent,
    TableProductsComponent,
    TableUsersComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbPaginationModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
