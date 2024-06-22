import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AdminProductsService } from '../services/admin-products.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductsAdminEffects {
  constructor(
    private actions$: Actions,
    private productsServices: AdminProductsService,
    private router: Router
  ) { }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap((action) => {
        const getProducts = action.pageable ?
          this.productsServices.getProductsAdmin(action.pageable)
          : this.productsServices.getProductsAdmin();
        return getProducts.pipe(
          map((response) => {
            return ProductsActions.loadProductsSuccess({
              product: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
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
        return this.productsServices.getProductsByIdAdmin(action.id).pipe(
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

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.editProduct),
      mergeMap((action) => {
        return this.productsServices.editProductAdmin(action.id, action.product).pipe(
          map((response) => {
            Swal.fire('Producto guardado', `Producto modificado con éxito.`, 'success')
              .then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/dashboard/product']);
                }
              })
            return ProductsActions.editProductSuccess();
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
        return this.productsServices.deleteProductAdmin(action.id).pipe(
          map((response) => {
            Swal.fire('¡Producto eliminado con éxito!', '', 'success').then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            })
            return ProductsActions.deleteProductSuccess();
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
        return this.productsServices.postPromotion(action.product).pipe(
          map((response) => {
            Swal.fire('Producto guardado', `Producto ${action.product.name} agregado con éxito.`, 'success')
              .then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/dashboard/product']);
                }
              })
            return ProductsActions.createProductSuccess();
          }),
          catchError((error) => {
            return of(ProductsActions.createProductFail({ error }));
          })
        );
      })
    )
  );
  loadProductsByLowStock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductByLowStock),
      mergeMap((action) => {
        const getProducts = action.pageable ?
          this.productsServices.getProductsByLowStack(action.pageable)
          : this.productsServices.getProductsByLowStack();
        return getProducts.pipe(
          map((response) => {
            return ProductsActions.loadProductByLowStockSuccess({
              products: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
            });
          }),
          catchError((error) => {
            return of(ProductsActions.loadProductByLowStockFail({ error }));
          })
        );
      })
    )
  );
}
