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

  constructor(
    private httpClient: HttpClient,
    // private authService: AuthService
    ) { }

  // private agregarAuthorizationHeader(){
  //   let token=this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization','Bearer '+ token);
  //   }
  //   return this.httpHeaders;
  // }

  getProducts():Observable<any>{
    const finalUrl='localhost:8080/products';

    return new Observable((obs)=>{
      this.httpClient.get(finalUrl
        // ,{headers:this.agregarAuthorizationHeader()}
        )
      // .pipe(
      //   catchError(e=>{
      //     this.noAutorizado(e);
      //     return throwError(e);
      //   })
      // )
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
    const finalUrl='localhost:8080/products';

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
}
