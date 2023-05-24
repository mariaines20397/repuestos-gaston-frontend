import { createReducer, on } from "@ngrx/store";
import * as LoginActions from "./login.actions";

export const initialState: any={}
export const loginReducer = createReducer<any>(
    initialState,
    on(
        LoginActions.loadLogin,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        LoginActions.loadLoginSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        LoginActions.loadLoginFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)