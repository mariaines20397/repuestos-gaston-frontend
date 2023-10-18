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

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      mergeMap((action) => {
        return this.userServices.getUserById(action.id).pipe(
          map((response) => {
            return UserActions.loadUserByIdSuccess({
              user: response.data,
            });
          }),
          catchError((error) => {
            return of(UserActions.loadUserByIdFail({ error }));
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
}
