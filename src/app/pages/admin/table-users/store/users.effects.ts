import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { AdminUsersService } from '../services/admin-users.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersAdminEffects {
  constructor(
    private actions$: Actions,
    private userServices: AdminUsersService,
    private router: Router,
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap((action) => {
        const getUser = action.pageable ? 
        this.userServices.getUsersAdmin(action.pageable)
        : this.userServices.getUsersAdmin();
        return getUser.pipe(
          map((response) => {
            return UsersActions.loadUsersSuccess({
              user: response.content,
              pageable:response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
            });
          }),
          catchError((error) => {
            return of(UsersActions.loadUsersFail({ error }));
          })
        );
      })
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUserById),
      mergeMap((action) => {
        console.log(action);
        return this.userServices.getUserByIdAdmin(action.id).pipe(
          map((response) => {
            return UsersActions.loadUserByIdSuccess({
              user: response,
            });
          }),
          catchError((error) => {
            return of(UsersActions.loadUserByIdFail({ error }));
          })
        );
      })
    )
  );
}
