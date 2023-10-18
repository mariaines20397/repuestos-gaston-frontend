import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const initialState: any={}
export const userReducer = createReducer<any>(
    initialState,
    //user
    on(
        UserActions.loadUserById,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        UserActions.loadUserByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        UserActions.loadUserByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //edit user
    on(
        UserActions.editUser,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        UserActions.editUserSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        UserActions.editUserFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)