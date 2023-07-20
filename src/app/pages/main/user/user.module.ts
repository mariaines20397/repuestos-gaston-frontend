import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { StoreModule } from '@ngrx/store';
import * as fromUserReducer from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(
      'user',
      fromUserReducer.userReducer
    ),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
