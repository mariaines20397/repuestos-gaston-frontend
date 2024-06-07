import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export const initialState: any={}
export const userReducer = createReducer<any>(
    initialState,
    //user
    on(
        UserActions.loadProfile,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        UserActions.loadProfileSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        UserActions.loadProfileFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //edit user
    on(
        UserActions.editUser,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    ),
    on(
        UserActions.editUserSuccess,
        (state, props):any => ({
            ...state
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