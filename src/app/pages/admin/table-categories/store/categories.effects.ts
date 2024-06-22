import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of, retry } from 'rxjs';
import { AdminCategoriesService } from '../services/admin-categories.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CategoriesAdminEffects {
  constructor(
    private actions$: Actions,
    private categoriesServices: AdminCategoriesService,
    private router: Router,
  ) {}

  loadCategories$ = createEffect(() =>    
    this.actions$.pipe(      
      ofType(CategoriesActions.loadCategories),      
      mergeMap((action) => {
        const getCategory = action.pageable ? 
        this.categoriesServices.getCategoriesAdmin(action.pageable)
        : this.categoriesServices.getCategoriesAdmin();
        return getCategory.pipe(
          map((response) => {
            return CategoriesActions.loadCategoriesSuccess({
              category: response.content,
              pageable:response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
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

  loadCategoriesByName$ = createEffect(() =>    
    this.actions$.pipe(      
      ofType(CategoriesActions.loadCategoriesByName),      
      mergeMap((action) => {
        const getCategory = action.pageable ? 
        this.categoriesServices.getCategoriesByName(action.filter, action.pageable)
        : this.categoriesServices.getCategoriesByName(action.filter);
        return getCategory.pipe(
          map((response) => {
            return CategoriesActions.loadCategoriesByNameSuccess({
              category: response.content,
              pageable:response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
            });
          }),
          retry({ count: 2, delay: 100 }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoriesByNameFail({ error }));
          })
        );
      })
    )
  );

  loadCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategoryById),
      mergeMap((action) => {
        return this.categoriesServices.getCategoriesByIdAdmin(action.id).pipe(
          map((response) => {
            return CategoriesActions.loadCategoryByIdSuccess({
              category: response,
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
      return this.categoriesServices.editCategoryAdmin(action.id, action.category).pipe(
        map((response) => {
          Swal.fire('Categoría guardada', `Categoría modificada con éxito.`, 'success')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/dashboard/category']);
            } 
          })
          return CategoriesActions.editCategorySuccess();
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
      return this.categoriesServices.deleteCategoryAdmin(action.id).pipe(
        map((response) => {
          Swal.fire('Cateogría eliminada con éxito!', '', 'success').then((result)=> {
            if (result.isConfirmed) {
              location.reload();
            }
          })
          return CategoriesActions.deleteCategorySuccess();
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
      return this.categoriesServices.postCategory(action.category).pipe(
        map((response) => {
          Swal.fire('Categoría guardada', `Categoría ${action.category.name} agregada con éxito.`, 'success')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/dashboard/category']);
            } 
          })
          return CategoriesActions.createCategorySuccess();
        }),
        catchError((error) => {
          return of(CategoriesActions.createCategoryFail({ error }));
        })
      );
    })
  )
);
}
