import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SaleActions from './sale.actions';
import { catchError, map, mergeMap, of, take, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SaleService } from '../services/sale.service';

@Injectable({
  providedIn: 'root',
})
export class SaleAdminEffects {
  constructor(
    private actions$: Actions,
    private saleServices: SaleService,
    private router: Router,
  ) {}

  loadSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSales),
      mergeMap((action) => {
        const sales = action.pageable ? 
        this.saleServices.getSales(action.pageable)
        : this.saleServices.getSales();
        return sales.pipe(
          map((response) => {
            return SaleActions.loadSalesSuccess({
              sales: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadSalesFail({ error }));
          }),
        );
      })
    )
  );

  loadSaleByIdUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSaleById),
      mergeMap((action) => {
        return this.saleServices.getSalesById(action.id).pipe(
          map((response) => {
            return SaleActions.loadSaleByIdSuccess({
              sale: response,
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadSaleByIdFail({ error }));
          })
        );
      })
    )
  );

  loadProductByBarCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadProductByBarCode),
      mergeMap((action) => {
        return this.saleServices.getProductByBarCode(action.barCode).pipe(
          map((response) => {
            return SaleActions.loadProductByBarCodeSuccess({
              product: response,
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadProductByBarCodeFail({ error }));
          })
        );
      })
    )
  );

  createSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.createSale),
      mergeMap((action) => {
        return this.saleServices.createOrderSale().pipe(
          map((response) => {
            Swal.fire(`Orden de venta N° ${response.number_sale}`,'', 'success')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/dashboard/sale']);
            } 
          })
            return SaleActions.createSaleSuccess({
              sale: response,
            });
          }),
          catchError((error) => {
            return of(SaleActions.createSaleFail({ error }));
          })
        );
      })
    )
  );

  loadSaleByNumber$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadSaleByNumber),
      mergeMap((action) => {
        const sales = action.pageable ? 
        this.saleServices.getSales(action.pageable)
        : this.saleServices.getSales();
        return sales.pipe(
          map((response) => {
            return SaleActions.loadSaleByNumberSuccess({
              sales: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadSaleByNumberFail({ error }));
          })
        );
      })
    )
  );

  loadUpdateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadUpdateStatus),
      mergeMap((action) => {
        return this.saleServices.updateStatus(action.id, action.status).pipe(
          map((response) => {
            Swal.fire(`Estado de orden actualizada con éxito`, '','success')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/admin/dashboard/sale']);
            } 
          })
            return SaleActions.loadUpdateStatusSuccess({
              sales: response
            });
          }),
          catchError((error) => {
            return of(SaleActions.loadUpdateStatusFail({ error }));
          })
        );
      })
    )
  );
  }
