import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userServices: UserService,
    private router: Router
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadProfile),
      mergeMap((action) => {
        return this.userServices.getProfile().pipe(
          map((response) => {
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
        return this.userServices.editUserById(action.user).pipe(
          map((response) => {
            Swal.fire('¡Usuario modificado!', 'Los datos del usuario se modificaron con éxito', 'success').then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/users/profile'])
              } 
            });
            return UserActions.editUserSuccess();
          }),
          catchError((error) => {
            return of(UserActions.editUserFail({ error }));
          })
        );
      })
    )
  );
  
}
