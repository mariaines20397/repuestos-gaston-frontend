import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromSearchReducer from './navbar/store/search.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './navbar/store/search.effects';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      'search',
      fromSearchReducer.searchReducer
    ),
    EffectsModule.forFeature([SearchEffects])
  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
