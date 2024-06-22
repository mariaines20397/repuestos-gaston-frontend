import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/users.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private httpClient: HttpClient
    ) {}

  public getProfile():Observable<any>{
    const finalUrl=`http://localhost:8080/v1/users/profile`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
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

  public editUserById(user:User):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/users/`;
    return new Observable((obs)=>{
      this.httpClient.put(finalUrl, user)
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
