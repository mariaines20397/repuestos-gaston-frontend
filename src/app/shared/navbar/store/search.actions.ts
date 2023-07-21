import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/pages/main/products/model/product.model";

//search
export const loadSearch = createAction('[Search] loadProducts',
props<{filter:string}>());
export const loadSearchSuccess = createAction('[Search] loadSearchSuccess',
props<{product:Product[]}>());
export const loadSearchFail = createAction('[Search] loadSearchFail',
props<{error:any}>());
