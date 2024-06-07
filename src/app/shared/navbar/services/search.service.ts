import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/pages/main/user/model/users.model';
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

  getProductsByFilter(filters:string):Observable<any>{
    let queryParams: any = null;
    // if (filters) {
    //   // filters = filters.filter(([_, value]) => value != null || value != undefined)
    //   queryParams = new HttpParams({ fromObject: { filters} });
    // }
    return new Observable((obs)=>{
      this.httpClient.get(`${this.finalUrl}/v1/product/filter/${filters}/name`)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
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

  logout():Observable<any>{
    console.log('entro al servicio');
    
    const finalUrl=`http://localhost:8080/logout`;
    return new Observable((obs)=>{
      this.httpClient.get('http://localhost:8080/logout')
      .subscribe({
        next: (res) => {
          console.log(res);
          
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
         // this.isNoAuthorization(error);
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  
}
