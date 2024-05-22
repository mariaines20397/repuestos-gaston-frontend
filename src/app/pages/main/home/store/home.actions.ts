import { createAction, props } from "@ngrx/store";

export const loadHome = createAction('[Home] loadHome');
export const loadHomeSuccess = createAction('[Home] loadHomeSuccess',
props<{products:any[]}>());
export const loadHomeFail = createAction('[Home] loadHomeFail',
props<{error:any}>());

//load categories
// export const loadCategories = createAction('[AdminCategories] loadCategories');
// export const loadCategoriesSuccess = createAction('[AdminCategories] loadCategoriesSuccess',
// props<{category:any}>());
// export const loadCategoriesFail = createAction('[AdminCategories] loadCategoriesFail',
// props<{error:any}>());