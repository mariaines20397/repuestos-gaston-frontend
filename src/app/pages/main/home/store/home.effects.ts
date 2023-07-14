import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HomeActions from './home.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HomeService } from '../services/home.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private homeServices: HomeService,
  ) {}

  loadHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHome),
      mergeMap((action) => {
        return this.homeServices.getProducts().pipe(
          map((response) => {
            return HomeActions.loadHomeSuccess({
              products: response.data,
            });
          }),
          catchError((error) => {
            return of(HomeActions.loadHomeFail({ error }));
          })
        );
      })
    )
  );
}
