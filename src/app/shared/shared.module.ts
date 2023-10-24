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
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbTooltipModule,
    StoreModule.forFeature(
      'search',
      fromSearchReducer.searchReducer
    ),
    EffectsModule.forFeature([SearchEffects])
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    SidebarAdminComponent
  ]
})
export class SharedModule { }
