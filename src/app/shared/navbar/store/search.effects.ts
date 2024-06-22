import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import * as LoginActions from 'src/app/pages/login/store/login.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from '../services/search.service';
import { Store } from '@ngrx/store';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private searchServices: SearchService,
    private loginServices: LoginService,
    private router: Router,
    public authService: AuthService,
    private store:Store
  ) {
  }

  loadProductsByFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadSearch),
      mergeMap((action) => {
        return this.searchServices.getProductsByFilter(action.filter).pipe(
          map((response) => {
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
      ofType(LoginActions.loadLogout),
      mergeMap((action) => {
        return this.loginServices.logout().pipe(
          map((response) => {
             Swal.fire(
               `¡Hasta pronto!`,
               `Has cerrado sesión con éxito`,
               'success'
             );
             this.store.dispatch(LoginActions.loadClearUserState({user:null}));
             this.router.navigate(['/login']);
            return LoginActions.loadLogoutSuccess();
          }),
          catchError((error) => {
            return of(LoginActions.loadLogoutFail({ error }));
          })
        );
      })
    )
  );
 
}
