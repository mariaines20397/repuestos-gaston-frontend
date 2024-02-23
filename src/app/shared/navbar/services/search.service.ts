import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/pages/main/user/model/users.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  filters: string = '';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  finalUrl=`localhost:8080`;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  getProductsByFilter(filters:string):Observable<any>{
    let queryParams: any = null;
    if (filters) {
      // filters = filters.filter(([_, value]) => value != null || value != undefined)
      queryParams = new HttpParams({ fromObject: { filters} });
    }
    return new Observable((obs)=>{
      this.httpClient.get(`${this.finalUrl}/search`,{params:queryParams})
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

  logout(user:User):Observable<any>{
    return new Observable((obs)=>{
      this.httpClient.post(`${this.finalUrl}/logout`,user).subscribe({
        next: (res) => {
          console.log(res);
          
          this.router.navigate(['/home']);
          Swal.fire(
            '¡Hasta pronto!',
            `${user.username} has cerrado sesión con éxito`,
            'success'
          );
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
