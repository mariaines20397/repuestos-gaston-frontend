import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  getProducts():Observable<any>{
    const finalUrl=`${this.url}/product/getAll`;
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

}
