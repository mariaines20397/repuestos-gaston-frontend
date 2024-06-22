import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of, retry } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesServices: CategoriesService,
    private searchServices: SearchService,
    private router: Router,
  ) {}

  loadCategories$ = createEffect(() =>    
    this.actions$.pipe(      
      ofType(CategoriesActions.loadCategories),      
      mergeMap((action) => {
        return this.categoriesServices.getCategories().pipe(
          map((response) => {
            return CategoriesActions.loadCategoriesSuccess({
              category: response.content,
            });
          }),
          retry({ count: 2, delay: 100 }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoriesFail({ error }));
          })
        );
      })
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadProductsByCategory),
      mergeMap((action) => {
        const getProductsByCategory = action.pageable ? 
        this.categoriesServices.getProductsByCategory(action.id,action.pageable)
         : this.categoriesServices.getProductsByCategory(action.id);
        return getProductsByCategory.pipe(
          map((response) => {
            return CategoriesActions.loadProductsByCategorySuccess({
              product: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(CategoriesActions.loadProductsByCategoryFail({ error }));
          })
        );
      })
    )
  );
}
