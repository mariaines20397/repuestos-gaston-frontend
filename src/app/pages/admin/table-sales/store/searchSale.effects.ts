import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchSaleActions from './searchSale.actions';
import { catchError, map, mergeMap, of, take, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SaleService } from '../services/sale.service';

@Injectable({
  providedIn: 'root',
})
export class SearchSaleEffects {
  constructor(
    private actions$: Actions,
    private saleServices: SaleService,
    private router: Router,
  ) {}

  loadSaleOrderByNumberSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchSaleActions.loadSaleOrderByNumberSale),
      mergeMap((action) => {
        const sale = action.pageable ? 
        this.saleServices.getOrderByNumberSale(action.numberSale, action.pageable)
        : this.saleServices.getOrderByNumberSale(action.numberSale)
        return sale.pipe(
          map((response) => {
            return SearchSaleActions.loadSaleOrderByNumberSaleSuccess({
              sale: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(SearchSaleActions.loadSaleOrderByNumberSaleFail({ error }));
          })
        );
      })
    )
  );
}
