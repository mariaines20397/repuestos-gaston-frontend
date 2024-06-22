import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  filters: string = '';
  finalUrl=`http://localhost:8080`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  public getProductsByFilter(filters:string):Observable<any>{
    return new Observable((obs)=>{
      this.httpClient.get(`${this.finalUrl}/v1/product/filter/${filters}/name`)
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

  public logout():Observable<any>{
    const finalUrl=`http://localhost:8080/v1/auth/logout`;
    return new Observable((obs)=>{
      this.httpClient.post(`${finalUrl}`,{})
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
