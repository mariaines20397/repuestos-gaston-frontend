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
    )
)