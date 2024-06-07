import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RegisterActions from "./register.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { RegisterService } from "../services/register.service";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class RegisterEffects {
    constructor(
        private actions$: Actions,
        private registerServices: RegisterService,
        private router: Router
    ){}

    loadRegister$ = createEffect(()=>
    this.actions$.pipe(
        ofType(RegisterActions.loadRegister),
        mergeMap((action)=>{
            return this.registerServices.postRegister(action.user)
            .pipe(
                map((response)=>{
                    Swal.fire(
                        {title:'¡Usuario registrado!', 
                        html:'<p>Todo esta listo. Ahora inicia sesión para vivir la experiencia de Repuestos Gastón</p>',
                        icon:'success',
                        confirmButtonText:'Iniciar Sesión',
                        showConfirmButton: true,
                      }).then((result)=>{
                        if (result.isConfirmed) {
                          this.router.navigateByUrl('/login')
                        }
                      });    
                    return RegisterActions.loadRegisterSuccess();
                }),
                catchError((error) => {
                    Swal.fire('¡Lo siento!', 'Algo salió mal... Por favor, vuelve a intentarlo.','error');
                    return of(RegisterActions.loadRegisterFail({ error }))
                })
            )
        })
    )
    )
}