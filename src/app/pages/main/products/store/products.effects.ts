import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsServices: ProductsService,
    private router: Router,
  ) {}

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap((action) => {
        return this.productsServices.getProductsByCategory(action.id).pipe(
          map((response) => {
            return ProductsActions.loadProductsByCategorySuccess({
              product: response.data,
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
        console.log(action);
        return this.productsServices.getProductById(action.id).pipe(
          
          map((response) => {
            return ProductsActions.loadProductByIdSuccess({
              product: response.data,
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
