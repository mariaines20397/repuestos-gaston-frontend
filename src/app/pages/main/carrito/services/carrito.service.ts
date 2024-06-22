import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Stripe, loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndpoint: string = 'http://localhost:8080/v1/carts';
  private stripe: Stripe | null = null;
  constructor(
    private httpClient: HttpClient
    ) {
      this.initializeStripe();
     }
     private async initializeStripe() {
      this.stripe = await loadStripe('pk_test_51JUthTEWMcJGOerEbEngQlhxXayqiT1pqY9eLZuk2TzQ3J5ZOcUzYY44QmHPlSbLCDrnM1lkpW8LxJvrb4oLHhBi00fDljGZIC');
    }
    public getStripe() {
      return this.stripe;
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
  public addProduct(product?: any):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/addProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public getCartById():Observable<any>{
    const finalUrl=`${this.urlEndpoint}/id`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl )
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public removeProduct(id?:number):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/removeProduct/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl )
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public decreaseProduct(product?:any):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/decreaseProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public cleanCart():Observable<any>{
    const finalUrl=`${this.urlEndpoint}/clearShoppingCart`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,{body:''})
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  public createOrderSale():Observable<any> {
    const finalUrl=`http://localhost:8080/v1/orders/`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,{})
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
}
