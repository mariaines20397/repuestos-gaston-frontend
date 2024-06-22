import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoRoutingModule } from './carrito-routing.module';
import { CarritoComponent } from './carrito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import * as fromCarritoReducer from './store/carrito.reducer';
import { CarritoEffects } from './store/carrito.effects';
import { EffectsModule } from '@ngrx/effects';
import { PaymentSuccessComponent } from './payment/payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment/payment-cancel/payment-cancel.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    CarritoComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent
  ],
  imports: [
    CommonModule,
    CarritoRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    NgbTooltipModule,
    StoreModule.forFeature(
      'cart',
      fromCarritoReducer.carritoReducer
    ),
    EffectsModule.forFeature([CarritoEffects])
  
  ]
})
export class CarritoModule { }
