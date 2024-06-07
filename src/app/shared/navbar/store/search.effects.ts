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
    public authService: AuthService
  ) {}

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
      ofType(SearchActions.loadLogout),
      mergeMap((action) => {
        return this.searchServices.logout().pipe(
          map((response) => {
            console.log(response);
            
            const username = this.authService.usuario.Username;
             Swal.fire(
               `¡Hasta pronto ${username}!`,
               `Has cerrado sesión con éxito`,
               'success'
             ).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem('user');
                this.router.navigate(['/login'])
                location.reload();
              } 
            });
            return SearchActions.loadLogoutSuccess();
          }),
          catchError((error) => {
            return of(SearchActions.loadLogoutFail({ error }));
          })
        );
      })
    )
  );
 
}
