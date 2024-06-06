import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, catchError, of, throwError } from 'rxjs';
import { User } from 'src/app/pages/main/user/model/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  private subscriptions = new Subscription();
  user: any = {};

  constructor(private store: Store<{ user: User }>) {
    this.subscriptions.add(
      this.store
        .select('user')
        .subscribe((user) => this.user = user)
    );  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    return next.handle(request.clone({ headers: this.getHeaders() })).pipe(
      catchError((err) => {
        console.log(err);
        console.log('entro al interceptor');
        
        // if (err instanceof HttpErrorResponse && err.status === 401) {
          // return this.cognitoService.refreshUserSession().pipe(
          //   switchMap(() => {
               return next.handle(request.clone({ headers: this.getHeaders() }));
          //   })
          // );
        // } else {
         // return throwError(err);
        // }
      })
    );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.user?.jwt ? `Bearer ${this.user.jwt}` : '',
      'Content-Type': 'application/json',
      
    });
  }
}

export let authProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

