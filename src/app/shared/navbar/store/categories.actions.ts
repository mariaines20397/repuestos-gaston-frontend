import { createAction, props } from "@ngrx/store";
import { Pegeable } from "src/app/pages/admin/table-categories/model/category.model";
import { Product } from "src/app/pages/main/products/model/product.model";

//load categories
export const loadCategories = createAction('[Categories] loadCategories');
export const loadCategoriesSuccess = createAction('[Categories] loadCategoriesSuccess',
props<{category:any}>());
export const loadCategoriesFail = createAction('[Categories] loadCategoriesFail',
props<{error:any}>());

//productsByCategory
export const loadProductsByCategory = createAction('[ProductsByCategory] loadProducts',
props<{id:number, pageable?:Pegeable}>());
export const loadProductsByCategorySuccess = createAction('[ProductsByCategory] loadProductsByCategorySuccess',
props<{product:Product[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadProductsByCategoryFail = createAction('[ProductsByCategory] loadProductsByCategoryFail',
props<{error:any}>());