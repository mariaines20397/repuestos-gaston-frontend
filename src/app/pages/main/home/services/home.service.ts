import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  // private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  private url = 'http://localhost:8080/v1'
  constructor(
    private httpClient: HttpClient,
    ) { }


  getProducts(pagination?:any):Observable<any>{
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`${this.url}/product/`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl,{params:queryParams})
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

  // getCategoriesAdmin():Observable<any> {
  //   const finalUrl=`http://localhost:8080/v1/category/`;
  //   console.log('entro aca');
  //   return new Observable((obs)=>{
  //     this.httpClient.get(finalUrl)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
          
  //         // this.router.navigate(['/home']);
  //         obs.next(res);
  //         obs.complete();
  //       },
  //       error: (error) => {
  //         console.log(error);
          
  //         // Swal.fire('¡Lo siento!', error,'error');
  //         obs.error(error);
  //         obs.complete();
  //       }
  //     })
  //   })
  // }

}
