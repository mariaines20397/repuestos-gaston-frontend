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
        // private authService : AuthService,
        private router: Router
    ){}

    loadLogin$ = createEffect(()=>
    this.actions$.pipe(
        ofType(LoginActions.loadLogin),
        mergeMap((action)=>{
            return this.loginServices.postLogin(action.user)
            .pipe(
                map((response)=>{
                    console.log(response.data );
                    // this.authService.login(response.data).subscribe(res=>{
                    //     //Con res se obtiene el token
                    //     console.log(res);
                    //     this.authService.guardarUsuario(res.access_token);
                    //     this.authService.guardarToken(res.access_token);
                    //     let usuario = this.authService.usuario;
                    //     this.router.navigate(['/home']);
                    //     Swal.fire('¡Bienvenido!', `Hola ${usuario.username} has iniciado sesión con éxito`, 'success');
                    //   })
                    return LoginActions.loadLoginSuccess({
                        user:response.data 
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