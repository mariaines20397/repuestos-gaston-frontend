import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../user/model/users.model';
import { Store } from '@ngrx/store';
import { Stripe, loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlEndpoint: string = 'http://localhost:8080/v1/product'
  private subscriptions = new Subscription();
  user: User = {};
  private stripe: Stripe | null = null;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ user: User }>
    ) {
      this.subscriptions.add(this.store.select('user').subscribe((user) => (this.user = user)));
      this.initializeStripe();
     }
     private async initializeStripe() {
      this.stripe = await loadStripe('pk_test_51JUthTEWMcJGOerEbEngQlhxXayqiT1pqY9eLZuk2TzQ3J5ZOcUzYY44QmHPlSbLCDrnM1lkpW8LxJvrb4oLHhBi00fDljGZIC');
    }
    public getStripe() {
      return this.stripe;
    }
  getProductsByCategory(id:number,pagination?:any):Observable<any>{
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`${this.urlEndpoint}/filter/${id}/category`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl,{params:queryParams} )
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  getProductById(id:number):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/${id}`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl )
      .subscribe({
        next: (res) => {
          // this.router.navigate([`/products/${id}`]);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  addProductToCart(product?: any):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/carts/addProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  async payment(productPayment: any[]): Promise<void> {
    const stripe = await this.getStripe();
    if (!stripe) {
      throw new Error('Stripe no está inicializado.');
    }

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: productPayment,
        mode: 'payment',
        successUrl: window.location.origin + '/carrito/success',
        cancelUrl: window.location.origin + '/carrito/cancel',
      });
      if (error) {
        console.error('Error al redirigir a Stripe:', error.message);
        throw error;
      }
    } catch (error) {
      console.error('Error durante el checkout:', error);
      throw error;
    }
  }
}
