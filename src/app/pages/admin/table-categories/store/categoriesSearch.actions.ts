import { createAction, props } from "@ngrx/store";
import { Category, Pegeable, getAllCategory } from "../model/category.model";
import { Categorie } from "../../table-products/model/product.model";

//load categories by name
export const loadCategoriesByName = createAction('[AdminCategories] loadCategoriesByName',props<{filter:string,pageable?:Pegeable}>());
export const loadCategoriesByNameSuccess = createAction('[AdminCategories] loadCategoriesByNameSuccess',
props<{category:any[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadCategoriesByNameFail = createAction('[AdminCategories] loadCategoriesByNameFail',
props<{error:any}>());