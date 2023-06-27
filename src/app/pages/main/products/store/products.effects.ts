import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of, throwError } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsServices: ProductsService,
    private router: Router,
    // private authService: AuthService
  ) {}
//   private noAutorizado(e: any): boolean {
//     if (e.status == 401) {
//         if (this.authService.autenticado()) {
//             this.authService.logout();
//         }
//       this.router.navigate(['/login']);
//       return true;
//     }
//     if (e.status == 403) {
//       Swal.fire(
//         'Acceso denegado',
//         `Lo siento ${this.authService.usuario.username}, no tienes acceso a este recurso`,
//         'warning'
//       );
//       this.router.navigate(['/login']);
//       return true;
//     }
//     return false;
//   }
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap((action) => {
        return this.productsServices.getProducts().pipe(
          map((response) => {
            return ProductsActions.loadProductsSuccess({
              product: response.data,
            });
          }),
          catchError((error) => {
            // console.log(this.noAutorizado(error));

            // if (this.noAutorizado(error)) {
            //   return throwError(error);
            // }
            return of(ProductsActions.loadProductsFail({ error }));
          })
        );
      })
    )
  );
}
