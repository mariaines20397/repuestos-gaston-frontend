import { createReducer, on } from "@ngrx/store";
import * as CategoriesActions from "./categories.actions";

export const initialState: any={}
export const categoriesAdminReducer = createReducer<any>(
    initialState,
    //load products
    on(
      CategoriesActions.loadCategories,
      (state, props):any => (
        console.log(props),
        {
          ...state
      })
  ),
  on(
      CategoriesActions.loadCategoriesSuccess,
      (state, props):any => (
        console.log(props.category),
        
        {
          ...state,
          data:props.category
      })
  )
  ,
  on(
      CategoriesActions.loadCategoriesFail,
      (state, props):any => ({
          ...state,
          data:props.error
      })
  ),
    //productById
    on(
        CategoriesActions.loadCategoryById,
        (state):any => ({
            ...state
        })
    ),
    on(
        CategoriesActions.loadCategoryByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.category
        })
    )
    ,
    on(
        CategoriesActions.loadCategoryByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    // modificar producto
  on(
    CategoriesActions.editCategory,
    (state, props): any => ({
      ...state,
      data: props.category,
    })
  ),
  on(
    CategoriesActions.editCategorySuccess,
    (state, props): any => ({
      ...state,
      data: props.category,
    })
  ),
  on(
    CategoriesActions.editCategoryFail,
    (state, props): any => ({
      ...state,
      data:props.error
    })
  ),
  // eliminar producto
  on(
    CategoriesActions.deleteCategory,
    (state, props): any => ({
      ...state
    })
  ),
  on(
    CategoriesActions.deleteCategorySuccess,
    (state, props): any => ({
      ...state,
      data: props.category
    })
  ),
  on(
    CategoriesActions.deleteCategoryFail,
    (state, props): any => ({
      ...state,
      data:props.error
    })
  ),
  //create category
  on(
    CategoriesActions.createCategory,
    (state, props) => ({
      ...state,
      data: props.category,
    })
  ),
  on(
    CategoriesActions.createCategorySuccess,
    (state, props) => ({
      ...state,
      data: props.category,
    })
  ),
  on(
    CategoriesActions.createCategoryFail,
    (state, props) => ({
      ...state,
      data:props.error
    })
  ),
)