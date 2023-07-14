import { createReducer, on } from "@ngrx/store";
import * as HomeActions from "./home.actions";

export const initialState: any={}
export const homeReducer = createReducer<any>(
    initialState,
    on(
        HomeActions.loadHome,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        HomeActions.loadHomeSuccess,
        (state, props):any => ({
            ...state,
            data:props.products
        })
    )
    ,
    on(
        HomeActions.loadHomeFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)