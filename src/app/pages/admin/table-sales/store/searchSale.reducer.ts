import { createReducer, on } from "@ngrx/store";
import * as SearchSaleActions from './searchSale.actions';

export const initialState: any=[]
export const searchSaleReducer = createReducer<any>(
    initialState,
    //get order by number sale
    on(
        SearchSaleActions.loadSaleOrderByNumberSale,
        (state, props):any => ({
            ...state,
            numberSale:props.numberSale,
            pageable:props.pageable
        })
    ),
    on(
        SearchSaleActions.loadSaleOrderByNumberSaleSuccess,
        (state, props):any => ({
            ...state,
            search:props.sale,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        SearchSaleActions.loadSaleOrderByNumberSaleFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
)