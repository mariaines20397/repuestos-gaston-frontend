import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../user/model/users.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private urlEndpoint: string = 'http://localhost:8080/v1/carts'
  private subscriptions = new Subscription();
  user: User = {};
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ user: User }>
    ) {
      this.subscriptions.add(this.store.select('user').subscribe((user) => (this.user = user)));

     }
  addProduct(product?: any):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/addProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
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

  getCartById():Observable<any>{
    const finalUrl=`${this.urlEndpoint}/id`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl )
      .subscribe({
        next: (res) => {
          console.log(res);
          
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

  removeProduct(id?:number):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/removeProduct/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl )
      .subscribe({
        next: (res) => {
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

  decreaseProduct(product?:any):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/decreaseProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
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

  cleanCart():Observable<any>{
    const finalUrl=`${this.urlEndpoint}/clearShoppingCart`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,{body:''})
      .subscribe({
        next: (res) => {
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
}
