import { createReducer, on } from "@ngrx/store";
import * as SaleActions from './sale.actions';

export const initialState: any={}
export const salesReducer = createReducer<any>(
    initialState,
    //load sales
    on(
        SaleActions.loadSales,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        SaleActions.loadSalesSuccess,
        (state, props):any => ({
            ...state,
            data:props.sales
        })
    )
    ,
    on(
        SaleActions.loadSalesFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //saleByIdUser
    on(
        SaleActions.loadSaleByIdUser,
        (state):any => ({
            ...state
        })
    ),
    on(
        SaleActions.loadSaleByIdUserSuccess,
        (state, props):any => ({
            ...state,
            data:props.sale
        })
    )
    ,
    on(
        SaleActions.loadSaleByIdUserFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)