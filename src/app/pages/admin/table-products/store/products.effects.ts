import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { AdminProductsService } from '../services/admin-products.service';
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
    private productsServices: AdminProductsService,
    private router: Router,
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap((action) => {
        return this.productsServices.getProductsAdmin().pipe(
          map((response) => {
            return ProductsActions.loadProductsSuccess({
              product: response.data,
            });
          }),
          catchError((error) => {
            return of(ProductsActions.loadProductsFail({ error }));
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
        return this.productsServices.getProductsByIdAdmin(action.id).pipe(
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

  editProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.editProduct),
    mergeMap((action) => {
      console.log(action);
      return this.productsServices.editProductAdmin(action.id, action.product).pipe(
        map((response) => {
          return ProductsActions.editProductSuccess({
            product: response.data,
          });
        }),
        catchError((error) => {
          return of(ProductsActions.editProductFail({ error }));
        })
      );
    })
  )
);

deleteProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.deleteProduct),
    mergeMap((action) => {
      console.log(action);
      return this.productsServices.deleteProductAdmin(action.id).pipe(
        map((response) => {
          return ProductsActions.deleteProductSuccess({
            product: response.data,
          });
        }),
        catchError((error) => {
          return of(ProductsActions.deleteProductFail({ error }));
        })
      );
    })
  )
);

createProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductsActions.createProduct),
    mergeMap((action) => {
      console.log(action);
      return this.productsServices.postPromotion(action.product).pipe(
        map((response) => {
          return ProductsActions.createProductSuccess({
            product: response.data,
          });
        }),
        catchError((error) => {
          return of(ProductsActions.createProductFail({ error }));
        })
      );
    })
  )
);
}
