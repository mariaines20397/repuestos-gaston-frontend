import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userServices: UserService,
    private router: Router,
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      mergeMap((action) => {
        return this.userServices.getProfile().pipe(
          map((response) => {
            console.log(response);
            
            return UserActions.loadProfileSuccess({
              user: response,
            });
          }),
          catchError((error) => {
            return of(UserActions.loadProfileFail({ error }));
          })
        );
      })
    )
  );

  editUserd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap((action) => {
        return this.userServices.editUserById(action.id, action.user).pipe(
          map((response) => {
            return UserActions.editUserSuccess({
              user: response.data,
            });
          }),
          catchError((error) => {
            return of(UserActions.editUserFail({ error }));
          })
        );
      })
    )
  );
  loadLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadLogout),
      mergeMap((action) => {
        return this.userServices.logout().pipe(
          map((response) => {
            localStorage.removeItem('user');
            Swal.fire('¡Sesión cerrada!', 'Esperamos volver a verte pronto', 'success').then((result) => {
              if (result.isConfirmed) {
                location.reload();
              } 
            });
            return UserActions.loadLogoutSuccess();
          }),
          catchError((error) => {
            return of(UserActions.loadLogoutFail({ error }));
          })
        );
      })
    )
  );
}
