import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../user/model/users.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlEndpoint: string = 'http://localhost:8080/v1/product'
  private subscriptions = new Subscription();
  user: User = {};
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ user: User }>
    ) {
      this.subscriptions.add(this.store.select('user').subscribe((user) => (this.user = user)));

     }
  getProductsByCategory(id:number,pagination?:any):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/filter/${id}/category`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl )
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
}
