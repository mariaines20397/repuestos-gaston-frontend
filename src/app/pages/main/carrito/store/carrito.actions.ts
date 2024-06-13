import { createAction, props } from "@ngrx/store";

//addProduct
export const addProduct = createAction('[Cart] addProduct',
props<{product:any}>());
export const addProductSuccess = createAction('[Cart] addProductSuccess');
export const addProductFail = createAction('[Cart] addProductFail',
props<{error:any}>());

//GetById
export const loadCartById = createAction('[Cart] loadCartById');
export const loadCartByIdSuccess = createAction('[Cart] loadCartByIdSuccess',
props<{products:any[], total_price:number}>());
export const loadCartByIdFail = createAction('[Cart] loadCartByIdFail',
props<{error:any}>());

//removeProduct
export const removeProduct = createAction('[Cart] removeProduct',
props<{id:number}>());
export const removeProductSuccess = createAction('[Cart] removeProductSuccess');
export const removeProductFail = createAction('[Cart] removeProductFail',
props<{error:any}>());

//decreaseProduct
export const decreaseProduct = createAction('[Cart] decreaseProduct',
props<{product:any}>());
export const decreaseProductSuccess = createAction('[Cart] decreaseProductSuccess');
export const decreaseProductFail = createAction('[Cart] decreaseProductFail',
props<{error:any}>());

//cleanCart
export const cleanCart = createAction('[Cart] cleanCart');
export const cleanCartSuccess = createAction('[Cart] cleanCartSuccess');
export const cleanCartFail = createAction('[Cart] cleanCartFail',
props<{error:any}>());

//addProduct
export const loadPayment = createAction('[Cart] loadPayment',
props<{productPayment:any[]}>());
export const loadPaymentSuccess = createAction('[Cart] loadPaymentSuccess',
props<{prueba:any}>());
export const loadPaymentFail = createAction('[Cart] loadPaymentFail',
props<{error:any}>());