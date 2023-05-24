import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromLoginReducer from './store/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/login.effects';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      'login',
      fromLoginReducer.loginReducer
    ),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class LoginModule { }
