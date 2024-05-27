import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private searchServices: SearchService,
    private router: Router,
  ) {}

  loadProductsByFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadSearch),
      mergeMap((action) => {
        return this.searchServices.getProductsByFilter(action.filter).pipe(
          map((response) => {
            console.log(response);
            
            return SearchActions.loadSearchSuccess({
              product: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(SearchActions.loadSearchFail({ error }));
          })
        );
      })
    )
  );

  loadLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadLogout),
      mergeMap((action) => {
        return this.searchServices.logout(action.user).pipe(
          map((response) => {
            return SearchActions.loadLogoutSuccess({
              message: response,
            });
          }),
          catchError((error) => {
            return of(SearchActions.loadLogoutFail({ error }));
          })
        );
      })
    )
  );

 
}
