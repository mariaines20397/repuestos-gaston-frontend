import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  filters: string = '';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  getProductsByFilter(filters:string):Observable<any>{
    const finalUrl=`localhost:8080/search`;
    let queryParams: any = null;
    if (filters) {
      // filters = filters.filter(([_, value]) => value != null || value != undefined)
      queryParams = new HttpParams({ fromObject: { filters} });
    }
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

  
}
