import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  private urlEndpoint: string = 'localhost:8080/products'
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }
    getProducts():Observable<any>{
      const finalUrl=`${this.urlEndpoint}/`;
      return new Observable((obs)=>{
        this.httpClient.get(finalUrl)
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
  getProductsByCategory(id:number):Observable<any>{
    const finalUrl=`${this.urlEndpoint}/categories/${id}`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
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

  postProducts(product:any):Observable<any>{
    const finalUrl= `${this.urlEndpoint}/`;

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl, product).subscribe({
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
      this.httpClient.get(finalUrl)
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
