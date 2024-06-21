import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersSearchActions from './usersSearch.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { AdminUsersService } from '../services/admin-users.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersSearchEffects {
  constructor(
    private actions$: Actions,
    private userServices: AdminUsersService,
    private router: Router,
  ) {}

  loadUsersByDni$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersSearchActions.loadUsersByDni),
      mergeMap((action) => {
        const getUser = action.pageable ? 
        this.userServices.getUsersByDni(action.dni,action.pageable)
        : this.userServices.getUsersByDni(action.dni);
        return getUser.pipe(
          map((response) => {
            return UsersSearchActions.loadUsersByDniSuccess({
              user: response.content,
              pageable:response.pageable,
              totalPages: response.totalPages,
              totalElements: response.totalElements
            });
          }),
          catchError((error) => {
            return of(UsersSearchActions.loadUsersByDniFail({ error }));
          })
        );
      })
    )
  );

  
}
