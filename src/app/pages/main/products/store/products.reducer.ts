import { createReducer, on } from "@ngrx/store";
import * as ProductsActions from "./products.actions";

export const initialState: any={}
export const productsReducer = createReducer<any>(
    initialState,
    //products
    on(
        ProductsActions.loadProductsByCategory,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        ProductsActions.loadProductsByCategorySuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        ProductsActions.loadProductsByCategoryFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productById
    on(
        ProductsActions.loadProductById,
        (state):any => ({
            ...state
        })
    ),
    on(
        ProductsActions.loadProductByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        ProductsActions.loadProductByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)