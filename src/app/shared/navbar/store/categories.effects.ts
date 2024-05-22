import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CategoriesActions from './categories.actions';
import { catchError, map, mergeMap, of, retry, throwError } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from '../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesServices: CategoriesService,
    private searchServices: SearchService,
    private router: Router,
  ) {}

  loadCategories$ = createEffect(() =>    
    this.actions$.pipe(      
      ofType(CategoriesActions.loadCategories),      
      mergeMap((action) => {
        console.log(action);
        console.log('entro aca');
        return this.categoriesServices.getCategories().pipe(
          map((response) => {
            console.log(response);
            
            return CategoriesActions.loadCategoriesSuccess({
              category: response.content,
            });
          }),
          retry({ count: 2, delay: 100 }),
          catchError((error) => {
            return of(CategoriesActions.loadCategoriesFail({ error }));
          })
        );
      })
    )
  );
}
