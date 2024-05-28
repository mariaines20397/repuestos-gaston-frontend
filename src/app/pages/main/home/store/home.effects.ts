import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as HomeActions from './home.actions';
import { catchError, map, mergeMap, of, retry } from 'rxjs';
import { HomeService } from '../services/home.service';
import * as CategoriesActions from '../store/home.actions'
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
        const getProducts = action.pageable ? 
        this.homeServices.getProducts(action.pageable)
         : this.homeServices.getProducts();
        return getProducts.pipe(
          map((response) => {
            return HomeActions.loadHomeSuccess({
              products: response.content,
              pageable: response.pageable,
              totalPages: response.totalPages,
              totalElements:response.totalElements
            });
          }),
          catchError((error) => {
            return of(HomeActions.loadHomeFail({ error }));
          })
        );
      })
    )
  );
  // loadCategories$ = createEffect(() =>    
  //   this.actions$.pipe(      
  //     ofType(CategoriesActions.loadCategories),      
  //     mergeMap((action) => {
  //       console.log(action);
  //       console.log('entro aca');
  //       return this.homeServices.getCategoriesAdmin().pipe(
  //         map((response) => {
  //           console.log(response);
            
  //           return CategoriesActions.loadCategoriesSuccess({
  //             category: response.content,
  //           });
  //         }),
  //         retry({ count: 2, delay: 100 }),
  //         catchError((error) => {
  //           return of(CategoriesActions.loadCategoriesFail({ error }));
  //         })
  //       );
  //     })
  //   )
  // );
}
