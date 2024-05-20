import { createReducer, on } from "@ngrx/store";
import * as SearchActions from "./search.actions";

export const initialState: any={}
export const searchReducer = createReducer<any>(
    initialState,
    //products
    on(
        SearchActions.loadSearch,
        (state, props):any => ({
            ...state,
            filter: props.filter,
        })
    ),
    on(
        SearchActions.loadSearchSuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        SearchActions.loadSearchFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //logout
    on(
        SearchActions.loadLogout,
        (state, props):any => ({
            ...state,
            filter: props.user,
        })
    ),
    on(
        SearchActions.loadLogoutSuccess,
        (state, props):any => ({
            ...state,
            data:props.message
        })
    )
    ,
    on(
        SearchActions.loadLogoutFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)