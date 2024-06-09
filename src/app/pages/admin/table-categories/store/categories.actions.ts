import { createAction, props } from "@ngrx/store";
import { Category, Pegeable, getAllCategory } from "../model/category.model";
import { Categorie } from "../../table-products/model/product.model";

//load categories
export const loadCategories = createAction('[AdminCategories] loadCategories',props<{pageable?:Pegeable}>());
export const loadCategoriesSuccess = createAction('[AdminCategories] loadCategoriesSuccess',
props<{category:any[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadCategoriesFail = createAction('[AdminCategories] loadCategoriesFail',
props<{error:any}>());

//edit category
export const editCategory = createAction('[AdminCategories] editCategory',
props<{id:number, category:any}>());
export const editCategorySuccess = createAction('[AdminCategories] editCategorySuccess');
export const editCategoryFail = createAction('[AdminCategories] editCategoryFail',
props<{error:any}>());

//delete category
export const deleteCategory = createAction('[AdminCategories] deleteCategory',
props<{id:number}>());
export const deleteCategorySuccess = createAction('[AdminCategories] deleteCategorySuccess');
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
    '[AdminCategories] createCategorySuccess'
  );
  export const createCategoryFail = createAction(
    '[AdminCategories] createCategoryFail',
    props<{ error: any }>()
  );

  //load categories by name
export const loadCategoriesByName = createAction('[AdminCategories] loadCategoriesByName',props<{filter:string,pageable?:Pegeable}>());
export const loadCategoriesByNameSuccess = createAction('[AdminCategories] loadCategoriesByNameSuccess',
props<{category:any[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadCategoriesByNameFail = createAction('[AdminCategories] loadCategoriesByNameFail',
props<{error:any}>());