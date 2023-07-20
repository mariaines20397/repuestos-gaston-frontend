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

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) => {
        return this.userServices.getUser().pipe(
          map((response) => {
            return UserActions.loadUserSuccess({
              user: response.data,
            });
          }),
          catchError((error) => {
            return of(UserActions.loadUserFail({ error }));
          })
        );
      })
    )
  );
}
