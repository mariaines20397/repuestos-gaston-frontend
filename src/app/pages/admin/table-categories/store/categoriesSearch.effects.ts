import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesSearchActions from './categoriesSearch.actions';
import { catchError, map, mergeMap, of, retry } from 'rxjs';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoriesSearchEffects {
  constructor(
    private actions$: Actions,
    private categoriesServices: AdminCategoriesService
  ) {}

  loadCategoriesByName$ = createEffect(() =>    
    this.actions$.pipe(      
      ofType(CategoriesSearchActions.loadCategoriesByName),      
      mergeMap((action) => {
        const getCategory = action.pageable ? 
        this.categoriesServices.getCategoriesByName(action.filter, action.pageable)
        : this.categoriesServices.getCategoriesByName(action.filter);
        return getCategory.pipe(
          map((response) => {
            return CategoriesSearchActions.loadCategoriesByNameSuccess({
              category: response.content,
              pageable:response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
            });
          }),
          retry({ count: 2, delay: 100 }),
          catchError((error) => {
            return of(CategoriesSearchActions.loadCategoriesByNameFail({ error }));
          })
        );
      })
    )
  );

  
}
