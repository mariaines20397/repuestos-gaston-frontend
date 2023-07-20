import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const initialState: any={}
export const userReducer = createReducer<any>(
    initialState,
    //user
    on(
        UserActions.loadUser,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        UserActions.loadUserSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        UserActions.loadUserFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)