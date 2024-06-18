import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginActions from "./login.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { LoginService } from "../services/login.service";
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Injectable({
    providedIn:'root'
})
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginServices: LoginService,
        private authService : AuthService,
        private router: Router,
        private store: Store
    ){}

    loadLogin$ = createEffect(()=>
    this.actions$.pipe(
        ofType(LoginActions.loadLogin),
        mergeMap((action)=>{
            return this.loginServices.postLogin(action.user)
            .pipe(
                map((response)=>{
                    if (response.Roles[0] == 'ROLE_ADMIN') {
                        this.router.navigate(['/admin']);
                    }else{
                        this.router.navigate(['/home']);
                    }
                    Swal.fire('¡Bienvenido!', `Hola ${response.Username} has iniciado sesión con éxito`, 'success');
                    
                    return LoginActions.loadLoginSuccess({
                        user:response.Username, 
                        jwt:response.token,
                        rol:response.Roles
                    });
                }),
                catchError((error) => {
                    if (error.status == 403) {
                        Swal.fire('¡Lo siento!', 'Usuario o contraseña incorrectas. Por favor vualve a intentarlo.', 'error');
                    }
                    return of(LoginActions.loadLoginFail({ error }));
                })
            )
        })
    )
    )
    loadLogout$ = createEffect(() =>
        this.actions$.pipe(
          ofType(LoginActions.loadLogout),
          mergeMap((action) => {
            return this.loginServices.logout().pipe(
              map((response) => {
                 Swal.fire(
                   `¡Hasta pronto!`,
                   `Has cerrado sesión con éxito`,
                   'success'
                 );
                 this.store.dispatch(LoginActions.loadClearUserState({user:null}));
                 this.router.navigate(['/login']);
                return LoginActions.loadLogoutSuccess();
              }),
              catchError((error) => {
                return of(LoginActions.loadLogoutFail({ error }));
              })
            );
          })
        )
      );
}