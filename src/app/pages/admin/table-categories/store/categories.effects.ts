import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesServices: AdminCategoriesService,
    private router: Router,
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap((action) => {
        return this.categoriesServices.getCategoriesAdmin().pipe(
          map((response) => {
            return CategoriesActions.loadCategoriesSuccess({
              category: response.data,
            });
          }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoriesFail({ error }));
          })
        );
      })
    )
  );

  loadCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategoryById),
      mergeMap((action) => {
        console.log(action);
        return this.categoriesServices.getCategoriesByIdAdmin(action.id).pipe(
          map((response) => {
            return CategoriesActions.loadCategoryByIdSuccess({
              category: response.data,
            });
          }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoryByIdFail({ error }));
          })
        );
      })
    )
  );

  editCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriesActions.editCategory),
    mergeMap((action) => {
      console.log(action);
      return this.categoriesServices.editCategoryAdmin(action.id, action.category).pipe(
        map((response) => {
          return CategoriesActions.editCategorySuccess({
            category: response.data,
          });
        }),
        catchError((error) => {
          return of(CategoriesActions.editCategoryFail({ error }));
        })
      );
    })
  )
);

deleteCategories$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriesActions.deleteCategory),
    mergeMap((action) => {
      console.log(action);
      return this.categoriesServices.deleteCategoryAdmin(action.id).pipe(
        map((response) => {
          return CategoriesActions.deleteCategorySuccess({
            category: response.data,
          });
        }),
        catchError((error) => {
          return of(CategoriesActions.deleteCategoryFail({ error }));
        })
      );
    })
  )
);

createCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoriesActions.createCategory),
    mergeMap((action) => {
      console.log(action);
      return this.categoriesServices.postCategory(action.category).pipe(
        map((response) => {
          return CategoriesActions.createCategorySuccess({
            category: response.data,
          });
        }),
        catchError((error) => {
          return of(CategoriesActions.createCategoryFail({ error }));
        })
      );
    })
  )
);
}
