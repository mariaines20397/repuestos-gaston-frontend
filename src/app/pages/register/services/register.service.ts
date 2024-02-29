import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient
  ) { }

  postRegister(user:object):Observable<any>{
    const finalUrl='http://localhost:8080/v1/user/createUser';

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,user)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          console.log(error);
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
}
