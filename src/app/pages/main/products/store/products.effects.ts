import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsServices: ProductsService
  ) {}

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap((action) => {
        const getProductsByCategory = action.pageable ? 
        this.productsServices.getProductsByCategory(action.id,action.pageable)
         : this.productsServices.getProductsByCategory(action.id);
        return getProductsByCategory.pipe(
          map((response) => {
            return ProductsActions.loadProductsByCategorySuccess({
              product: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(ProductsActions.loadProductsByCategoryFail({ error }));
          })
        );
      })
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductById),
      mergeMap((action) => {
        return this.productsServices.getProductById(action.id).pipe(
          map((response) => {
            return ProductsActions.loadProductByIdSuccess({
              product: response,
            });
          }),
          catchError((error) => {
            return of(ProductsActions.loadProductByIdFail({ error }));
          })
        );
      })
    )
  );
}
