import { createReducer, on } from "@ngrx/store";
import * as ProductsActions from "./products.actions";

export const initialState: any={}
export const productsReducer = createReducer<any>(
    initialState,
    on(
        ProductsActions.loadProducts,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        ProductsActions.loadProductsSuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        ProductsActions.loadProductsFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)