import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";

//products
export const loadProducts = createAction('[Products] loadProducts',
props<{product:any}>());
export const loadProductsSuccess = createAction('[Products] loadProductsSuccess',
props<{product:Product[]}>());
export const loadProductsFail = createAction('[Products] loadProductsFail',
props<{error:any}>());

//GetById
export const loadProductById = createAction('[ProductById] loadProductById',
props<{id:number}>());
export const loadProductByIdSuccess = createAction('[ProductById] loadProductByIdSuccess',
props<{product:Product}>());
export const loadProductByIdFail = createAction('[ProductById] loadProductByIdFail',
props<{error:any}>());