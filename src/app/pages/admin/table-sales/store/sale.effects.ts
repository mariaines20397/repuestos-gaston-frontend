import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SaleActions from './sale.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SaleService } from '../services/sale.service';

@Injectable({
  providedIn: 'root',
})
export class SaleEffects {
  constructor(
    private actions$: Actions,
    private saleServices: SaleService,
    private router: Router,
  ) {}

  loadSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSales),
      mergeMap((action) => {
        return this.saleServices.getSales().pipe(
          map((response) => {
            return SaleActions.loadSalesSuccess({
              sales: response.data,
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadSalesFail({ error }));
          })
        );
      })
    )
  );

  loadSaleByIdUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSaleByIdUser),
      mergeMap((action) => {
        return this.saleServices.getSalesByIdUser(action.id).pipe(
          map((response) => {
            return SaleActions.loadSaleByIdUserSuccess({
              sale: response.data,
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadSaleByIdUserFail({ error }));
          })
        );
      })
    )
  );
}
