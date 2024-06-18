import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  postLogin(user:object):Observable<any>{
    const finalUrl= `${this.url}/login`;

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,user).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  logout():Observable<any>{
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
         // this.isNoAuthorization(error);
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
}
