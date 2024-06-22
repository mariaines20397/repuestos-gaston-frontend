import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromSearchReducer from './navbar/store/search.reducer';
import * as fromCategoryReducer from './navbar/store/categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './navbar/store/search.effects';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesEffects } from './navbar/store/categories.effects';



@NgModule({
  declarations: [
    NavbarComponent,
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
    EffectsModule.forFeature([SearchEffects]),
    StoreModule.forFeature(
      'category',
      fromCategoryReducer.categoriesReducer
    ),
    EffectsModule.forFeature([CategoriesEffects])
  ],
  exports:[
    NavbarComponent,
    SidebarAdminComponent
  ]
})
export class SharedModule { }
