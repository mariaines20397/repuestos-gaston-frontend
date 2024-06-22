import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080';
  constructor(
    private httpClient: HttpClient
  ) { }

  public postLogin(user:object):Observable<any>{
    const finalUrl= `${this.url}/login`;

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,user).subscribe({
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
