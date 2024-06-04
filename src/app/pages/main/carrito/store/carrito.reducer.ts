import { createReducer, on } from "@ngrx/store";
import * as CarritoActions from "./carrito.actions";

export const initialState: any={}
export const carritoReducer = createReducer<any>(
    initialState,
    //addProduct
    on(
        CarritoActions.addProduct,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    ),
    on(
        CarritoActions.addProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoActions.addProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productById
    on(
        CarritoActions.loadCartById,
        (state):any => ({
            ...state
        })
    ),
    on(
        CarritoActions.loadCartByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.products,
            total_price:props.total_price
        })
    )
    ,
    on(
        CarritoActions.loadCartByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //removeProduct
    on(
        CarritoActions.removeProduct,
        (state, props):any => ({
            ...state,
            data:props.id
        })
    ),
    on(
        CarritoActions.removeProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoActions.removeProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //decreaseProduct
    on(
        CarritoActions.decreaseProduct,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    ),
    on(
        CarritoActions.decreaseProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoActions.decreaseProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //cleanCart
    on(
        CarritoActions.cleanCart,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        CarritoActions.cleanCartSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoActions.cleanCartFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)