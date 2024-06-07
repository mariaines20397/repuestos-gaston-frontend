import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../model/users.model';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subscriptions = new Subscription();
  user: User = {};
  
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<{ user: User }>
    ) {
      this.subscriptions.add(this.store.select('user').subscribe((user) => (this.user = user)));

     }
  isNoAuthorization(e:any):boolean{
    if ( e.status == 401 || e.status == 403 ) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;    
  }
  getProfile():Observable<any>{
    const finalUrl=`http://localhost:8080/v1/users/profile`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
        //  this.router.navigate(['/home']);
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

  editUserById(user:User):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/users/`;
    return new Observable((obs)=>{
      this.httpClient.put(finalUrl, user)
      .subscribe({
        next: (res) => {
          //this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
        //  this.isNoAuthorization(error);
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

 

}
