import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RegisterActions from "./register.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";
import { RegisterService } from "../services/register.service";

@Injectable({
    providedIn:'root'
})
export class RegisterEffects {
    constructor(
        private actions$: Actions,
        private registerServices: RegisterService
    ){}

    loadRegister$ = createEffect(()=>
    this.actions$.pipe(
        ofType(RegisterActions.loadRegister),
        mergeMap((action)=>{
            return this.registerServices.postRegister(action.user)
            .pipe(
                map((response)=>{
                    return RegisterActions.loadRegisterSuccess({
                        user:response.data 
                    });
                }),
                catchError((error) => {
                    return of(RegisterActions.loadRegisterFail({ error }))
                })
            )
        })
    )
    )
}