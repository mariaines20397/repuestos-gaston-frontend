import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";
import { Pegeable } from "src/app/shared/navbar/model/search.model";

//productsByCategory
export const loadProductsByCategory = createAction('[ProductsByCategory] loadProducts',
props<{id:number, pageable?:Pegeable}>());
export const loadProductsByCategorySuccess = createAction('[ProductsByCategory] loadProductsByCategorySuccess',
props<{product:Product[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadProductsByCategoryFail = createAction('[ProductsByCategory] loadProductsByCategoryFail',
props<{error:any}>());

//GetById
export const loadProductById = createAction('[ProductById] loadProductById',
props<{id:number}>());
export const loadProductByIdSuccess = createAction('[ProductById] loadProductByIdSuccess',
props<{product:Product}>());
export const loadProductByIdFail = createAction('[ProductById] loadProductByIdFail',
props<{error:any}>());