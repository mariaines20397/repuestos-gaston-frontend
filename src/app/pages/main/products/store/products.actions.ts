import { createAction, props } from "@ngrx/store";

export const loadProducts = createAction('[Products] loadProducts',
props<{product:any}>());
export const loadProductsSuccess = createAction('[Products] loadProductsSuccess',
props<{product:any[]}>());
export const loadProductsFail = createAction('[Products] loadProductsFail',
props<{error:any}>());