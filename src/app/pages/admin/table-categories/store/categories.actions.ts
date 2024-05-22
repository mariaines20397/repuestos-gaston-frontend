import { createAction, props } from "@ngrx/store";
import { Category, getAllCategory } from "../model/category.model";

//load categories
export const loadCategories = createAction('[AdminCategories] loadCategories');
export const loadCategoriesSuccess = createAction('[AdminCategories] loadCategoriesSuccess',
props<{category:any}>());
export const loadCategoriesFail = createAction('[AdminCategories] loadCategoriesFail',
props<{error:any}>());

//edit category
export const editCategory = createAction('[AdminCategories] editCategory',
props<{id:number, category:Category}>());
export const editCategorySuccess = createAction('[AdminCategories] editCategorySuccess',
props<{category:Category[]}>());
export const editCategoryFail = createAction('[AdminCategories] editCategoryFail',
props<{error:any}>());

//delete category
export const deleteCategory = createAction('[AdminCategories] deleteCategory',
props<{id:number}>());
export const deleteCategorySuccess = createAction('[AdminCategories] deleteCategorySuccess',
props<{category:Category}>());
export const deleteCategoryFail = createAction('[AdminCategories] deleteCategoryFail',
props<{error:any}>());

//GetById
export const loadCategoryById = createAction('[AdminCategoryById] loadCategoryById',
props<{id:number}>());
export const loadCategoryByIdSuccess = createAction('[AdminCategoryById] loadCategoryByIdSuccess',
props<{category:Category}>());
export const loadCategoryByIdFail = createAction('[AdminCategoryById] loadCategoryByIdFail',
props<{error:any}>());

//create category
export const createCategory = createAction(
    '[AdminCategories] createCategory',
    props<{ category: Category }>()
  );
  export const createCategorySuccess = createAction(
    '[AdminCategories] createCategorySuccess',
    props<{ category: Category }>()
  );
  export const createCategoryFail = createAction(
    '[AdminCategories] createCategoryFail',
    props<{ error: any }>()
  );