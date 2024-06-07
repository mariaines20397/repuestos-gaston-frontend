import { createReducer, on } from "@ngrx/store";
import * as CategoriesActions from "./categories.actions";

export const initialState: any={}
export const categoriesReducer = createReducer<any>(
    initialState,
    //load products
    on(
      CategoriesActions.loadCategories,
      (state, props):any => (
        {
          ...state
      })
  ),
  on(
      CategoriesActions.loadCategoriesSuccess,
      (state, props):any => (
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
  //productsByCategory
  on(
    CategoriesActions.loadProductsByCategory,
    (state, props):any => ({
        ...state,
        pageable:props.pageable
    })
),
on(
    CategoriesActions.loadProductsByCategorySuccess,
    (state, props):any => ({
        ...state,
        data:props.product,
        pageable:props.pageable,
        totalPages:props.totalPages,
        totalElements:props.totalElements
    })
)
,
on(
    CategoriesActions.loadProductsByCategoryFail,
    (state, props):any => ({
        ...state,
        data:props.error
    })
),
)