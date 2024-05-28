import { createAction, props } from "@ngrx/store";
import { Pegeable } from "src/app/pages/admin/table-products/model/product.model";

export const loadHome = createAction('[Home] loadHome',props<{pageable?:Pegeable}>());
export const loadHomeSuccess = createAction('[Home] loadHomeSuccess',
props<{products:any[], pageable?:Pegeable, totalElements:number, totalPages: number}>());
export const loadHomeFail = createAction('[Home] loadHomeFail',
props<{error:any}>());

//load categories
// export const loadCategories = createAction('[AdminCategories] loadCategories');
// export const loadCategoriesSuccess = createAction('[AdminCategories] loadCategoriesSuccess',
// props<{category:any}>());
// export const loadCategoriesFail = createAction('[AdminCategories] loadCategoriesFail',
// props<{error:any}>());