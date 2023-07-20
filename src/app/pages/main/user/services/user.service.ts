import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }

  getUser():Observable<any>{
    const finalUrl=`localhost:8080/user/profile`;
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
