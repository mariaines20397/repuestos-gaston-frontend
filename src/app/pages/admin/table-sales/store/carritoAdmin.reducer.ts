import { createReducer, on } from "@ngrx/store";
import * as CarritoAdminActions from './carritoAdmin.actions';

export const initialState: any={}
export const carritoAdminReducer = createReducer<any>(
    initialState,
    //addProduct
    on(
        CarritoAdminActions.addProduct,
        (state, props):any => ({
            ...state,
            product:props.product
        })
    ),
    on(
        CarritoAdminActions.addProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoAdminActions.addProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productById
    on(
        CarritoAdminActions.loadCartById,
        (state):any => ({
            ...state
        })
    ),
    on(
        CarritoAdminActions.loadCartByIdSuccess,
        (state, props):any => ({
            ...state,
            products:props.products,
            total_price:props.total_price
        })
    )
    ,
    on(
        CarritoAdminActions.loadCartByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //removeProduct
    on(
        CarritoAdminActions.removeProduct,
        (state, props):any => ({
            ...state,
            id:props.id
        })
    ),
    on(
        CarritoAdminActions.removeProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoAdminActions.removeProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //decreaseProduct
    on(
        CarritoAdminActions.decreaseProduct,
        (state, props):any => ({
            ...state,
            decreaseProduct:props.product
        })
    ),
    on(
        CarritoAdminActions.decreaseProductSuccess,
        (state, props):any => ({
            ...state
        })
    )
    ,
    on(
        CarritoAdminActions.decreaseProductFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
)