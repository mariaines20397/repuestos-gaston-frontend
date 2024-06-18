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
            user:props.user,
            jwt:props.jwt,
            rol:props.rol
        })
    )
    ,
    on(
        LoginActions.loadLoginFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //logout
    on(
        LoginActions.loadLogout,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        LoginActions.loadLogoutSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        LoginActions.loadLogoutFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //clear user state
    on(
        LoginActions.loadClearUserState,
        (state, props):any => ({
            user:props.user,
            jwt:null,
            rol:null
        })
    
)
)