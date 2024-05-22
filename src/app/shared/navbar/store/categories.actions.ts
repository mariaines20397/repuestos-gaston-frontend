import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/pages/main/products/model/product.model";

//load categories
export const loadCategories = createAction('[Categories] loadCategories');
export const loadCategoriesSuccess = createAction('[Categories] loadCategoriesSuccess',
props<{category:any}>());
export const loadCategoriesFail = createAction('[Categories] loadCategoriesFail',
props<{error:any}>());