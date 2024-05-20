import { LOCALE_ID, NgModule } from '@angular/core';
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
import { authProvider } from 'src/app/core/interceptors/auth-interceptor.service';
import { StoreModule } from '@ngrx/store';
import * as fromAdminProductReducer from './table-products/store/products.reducer';
import * as fromAdminCategoryReducer from './table-categories/store/categories.reducer';
import * as fromAdminSaleReducer from './table-sales/store/sale.reducer';
import * as fromAdminUserReducer from './table-users/store/users.reducer';
import { ProductsEffects } from './table-products/store/products.effects';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './table-categories/store/categories.effects';
import { SaleEffects } from './table-sales/store/sale.effects';
import { UsersEffects } from './table-users/store/users.effects';

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
    NgbTypeaheadModule,
    StoreModule.forFeature(
      'product',
      fromAdminProductReducer.productsReducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    StoreModule.forFeature(
      'category',
      fromAdminCategoryReducer.categoriesReducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
    StoreModule.forFeature(
      'sales',
      fromAdminSaleReducer.salesReducer
    ),
    EffectsModule.forFeature([SaleEffects]),
    StoreModule.forFeature(
      'user',
      fromAdminUserReducer.usersReducer
    ),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class AdminModule { }
