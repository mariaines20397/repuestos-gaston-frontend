import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginActions from "./login.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { LoginService } from "../services/login.service";
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginServices: LoginService,
        private authService : AuthService,
        private router: Router
    ){}

    loadLogin$ = createEffect(()=>
    this.actions$.pipe(
        ofType(LoginActions.loadLogin),
        mergeMap((action)=>{
            return this.loginServices.postLogin(action.user)
            .pipe(
                map((response)=>{
                    console.log(response);
                    
                    this.router.navigate(['/home']);
                    Swal.fire('¡Bienvenido!', `Hola ${response.Username} has iniciado sesión con éxito`, 'success');
                    return LoginActions.loadLoginSuccess({
                        user:{Username:response.Username, jwt:response.token}
                    });
                }),
                catchError((error) => {
                    if (error.status == 400) {
                        Swal.fire('¡Lo siento!', 'Usuario o contraseña incorrectas. Por favor vualve a intentarlo.', 'error');
                    }
                    return of(LoginActions.loadLoginFail({ error }));
                })
            )
        })
    )
    )
}