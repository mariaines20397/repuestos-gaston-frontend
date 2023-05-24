import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginActions from "./login.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({
    providedIn:'root'
})
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginServices: LoginService
    ){}

    loadLogin$ = createEffect(()=>
    this.actions$.pipe(
        ofType(LoginActions.loadLogin),
        mergeMap((action)=>{
            return this.loginServices.postLogin(action.user)
            .pipe(
                map((response)=>{
                    return LoginActions.loadLoginSuccess({
                        user:response.data 
                    });
                }),
                catchError((error) => {
                    return of(LoginActions.loadLoginFail({ error }))
                })
            )
        })
    )
    )
}