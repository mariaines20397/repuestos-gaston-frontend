import { createReducer, on } from "@ngrx/store";
import * as UsersActions from "./users.actions";

export const initialState: any={}
export const usersAdminReducer = createReducer<any>(
    initialState,
    //load products
    on(
        UsersActions.loadUsers,
        (state, props):any => ({
            ...state,
            pageable:props.pageable
        })
    ),
    on(
        UsersActions.loadUsersSuccess,
        (state, props):any => ({
            ...state,
            data:props.user,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        UsersActions.loadUsersFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productById
    on(
        UsersActions.loadUserById,
        (state):any => ({
            ...state
        })
    ),
    on(
        UsersActions.loadUserByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.user
        })
    )
    ,
    on(
        UsersActions.loadUserByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)