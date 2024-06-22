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
import * as fromCarritoAdminReducer from './table-sales/store/carritoAdmin.reducer';
import * as fromSearchSaleReducer from './table-sales/store/searchSale.reducer';
import * as fromUsersSearchReducer from './table-users/store/usersSearch.reducer';
import * as fromCategoriesSearchReducer from './table-categories/store/categoriesSearch.reducer';
import { ProductsAdminEffects } from './table-products/store/products.effects';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesAdminEffects } from './table-categories/store/categories.effects';
import { SaleAdminEffects } from './table-sales/store/sale.effects';
import { UsersAdminEffects } from './table-users/store/users.effects';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoAdminEffects } from './table-sales/store/carritoAdmin.effects';
import { SearchSaleEffects } from './table-sales/store/searchSale.effects';
import { UsersSearchEffects } from './table-users/store/usersSearch.effects';
import { CategoriesSearchEffects } from './table-categories/store/categoriesSearch.effects';
import { CoreModule } from 'src/app/core/core.module';


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
    CoreModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    StoreModule.forFeature(
      'productAdmin',
      fromAdminProductReducer.productsAdminReducer
    ),
    EffectsModule.forFeature([ProductsAdminEffects]),
    StoreModule.forFeature(
      'categoryAdmin',
      fromAdminCategoryReducer.categoriesAdminReducer
    ),
    EffectsModule.forFeature([CategoriesAdminEffects]),
    StoreModule.forFeature(
      'salesAdmin',
      fromAdminSaleReducer.salesAdminReducer
    ),
    EffectsModule.forFeature([SaleAdminEffects]),
    StoreModule.forFeature(
      'userAdmin',
      fromAdminUserReducer.usersAdminReducer
    ),
    EffectsModule.forFeature([UsersAdminEffects]),
    StoreModule.forFeature(
      'carritoAdmin',
      fromCarritoAdminReducer.carritoAdminReducer
    ),
    EffectsModule.forFeature([CarritoAdminEffects]),
    StoreModule.forFeature(
      'searchSale',
      fromSearchSaleReducer.searchSaleReducer
    ),
    EffectsModule.forFeature([SearchSaleEffects]),
    StoreModule.forFeature(
      'usersSearch',
      fromUsersSearchReducer.usersSearchReducer
    ),
    EffectsModule.forFeature([UsersSearchEffects]),
    StoreModule.forFeature(
      'categoriesSearch',
      fromCategoriesSearchReducer.categoriesSearchReducer
    ),
    EffectsModule.forFeature([CategoriesSearchEffects])
  ]
})
export class AdminModule { }
