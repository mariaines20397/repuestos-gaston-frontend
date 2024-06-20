import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CarritoActions from './carrito.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import Swal from 'sweetalert2';
import { ProductsService } from '../../products/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoEffects {
  constructor(
    private actions$: Actions,
    private carritoServices: CarritoService,
    private productsServices: ProductsService,
    private router: Router
  ) {}

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.addProduct),
      mergeMap((action) => {
        return this.carritoServices.addProduct(action.product).pipe(
          map((response) => {
            if(this.router.url.includes('carrito')){
              location.reload()
            }else{
              this.router.navigate(['/carrito']);
            }
            return CarritoActions.addProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoActions.addProductFail({ error }));
          })
        );
      })
    )
  );

  loadCartById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.loadCartById),
      mergeMap((action) => {
        return this.carritoServices.getCartById().pipe(
          map((response) => {
            return CarritoActions.loadCartByIdSuccess({
              products: response.products,
              total_price: response.total_price
            });
          }),
          catchError((error) => {
            return of(CarritoActions.loadCartByIdFail({ error }));
          })
        );
      })
    )
  );

  removeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.removeProduct),
      mergeMap((action) => {
        return this.carritoServices.removeProduct(action.id).pipe(
          map((response) => {
            location.reload();
            return CarritoActions.removeProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoActions.removeProductFail({ error }));
          })
        );
      })
    )
  );

  decreaseProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.decreaseProduct),
      mergeMap((action) => {
        return this.carritoServices.decreaseProduct(action.product).pipe(
          map((response) => {
            location.reload();
            return CarritoActions.decreaseProductSuccess();
          }),
          catchError((error) => {
            return of(CarritoActions.decreaseProductFail({ error }));
          })
        );
      })
    )
  );

  cleanCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.cleanCart),
      mergeMap((action) => {
        return this.carritoServices.cleanCart().pipe(
          map((response) => {
            Swal.fire('¡Tu carrito ahora esta limpio!', '', 'success').then((result) => {
              if (result.isConfirmed) {
                location.reload();
              } 
            })
            return CarritoActions.cleanCartSuccess();
          }),
          catchError((error) => {
            return of(CarritoActions.cleanCartFail({ error }));
          })
        );
      })
    )
  );

  createSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.createSale),
      mergeMap((action) => {
        return this.carritoServices.createOrderSale().pipe(
          map((response) => {
            return CarritoActions.createSaleSuccess({
              sale: response,
            });
          }),
          catchError((error) => {
            return of(CarritoActions.createSaleFail({ error }));
          })
        );
      })
    )
  );
  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.loadProductById),
      mergeMap((action) => {
        return this.productsServices.getProductById(action.id).pipe(
          map((response) => {
            return CarritoActions.loadProductByIdSuccess({
              product: response,
            });
          }),
          catchError((error) => {
            return of(CarritoActions.loadProductByIdFail({ error }));
          })
        );
      })
    )
  );
 /* loadPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CarritoActions.loadPayment),
      mergeMap((action) => {
        return this.carritoServices.payment(action.productPayment).pipe(
          map((response) => {
           console.log(response);
           
            return CarritoActions.loadPaymentSuccess({
              prueba:response
            });
          }),
          catchError((error) => {
            return of(CarritoActions.loadPaymentFail({ error }));
          })
        );
      })
    )
  );*/
}
