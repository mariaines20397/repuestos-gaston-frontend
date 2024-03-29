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
    const finalUrl='localhost:8080/register';

    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,user)
      .subscribe({
        next: (res) => {
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
}
