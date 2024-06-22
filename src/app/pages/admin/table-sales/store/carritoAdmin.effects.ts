import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CarritoAdminActions from './carritoAdmin.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../services/sale.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoAdminEffects {
  constructor(
    private actions$: Actions,
    private saleServices: SaleService,
    private router: Router,
  ) { }


  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoAdminActions.addProduct),
      mergeMap((action) => {
        return this.saleServices.addProduct(action.product).pipe(
          map((response) => {
            location.reload();
            return CarritoAdminActions.addProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoAdminActions.addProductFail({ error }));
          })
        );
      })
    )
  );

  loadCartById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoAdminActions.loadCartById),
      mergeMap((action) => {
        return this.saleServices.getCartById().pipe(
          map((response) => {
            return CarritoAdminActions.loadCartByIdSuccess({
              products: response.products,
              total_price: response.total_price
            });
          }),
          catchError((error) => {
            return of(CarritoAdminActions.loadCartByIdFail({ error }));
          })
        );
      })
    )
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoAdminActions.removeProduct),
      mergeMap((action) => {
        return this.saleServices.removeProduct(action.id).pipe(
          map((response) => {
            location.reload();
            return CarritoAdminActions.removeProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoAdminActions.removeProductFail({ error }));
          })
        );
      })
    )
  );

  decreaseProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoAdminActions.decreaseProduct),
      mergeMap((action) => {
        return this.saleServices.decreaseProduct(action.product).pipe(
          map((response) => {
            location.reload();
            return CarritoAdminActions.decreaseProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoAdminActions.decreaseProductFail({ error }));
          })
        );
      })
    )
  );
}
