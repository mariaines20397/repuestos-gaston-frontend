import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromRegisterReducer from './store/register.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from './store/register.effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      'register',
      fromRegisterReducer.registerReducer
    ),
    EffectsModule.forFeature([RegisterEffects])
  ]
})
export class RegisterModule { }
