import { createReducer, on } from "@ngrx/store";
import * as RegisterActions from "./register.actions";

export const initialState: any={}
export const registerReducer = createReducer<any>(
    initialState,
    on(
        RegisterActions.loadRegister,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        RegisterActions.loadRegisterSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        RegisterActions.loadRegisterFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)