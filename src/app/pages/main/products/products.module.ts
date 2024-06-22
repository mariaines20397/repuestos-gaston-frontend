import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProductReducer from './store/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbPaginationModule,
    CoreModule,
    StoreModule.forFeature(
      'product',
      fromProductReducer.productsReducer
    ),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsModule { }
