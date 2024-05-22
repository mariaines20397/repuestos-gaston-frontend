import { createReducer, on } from "@ngrx/store";
import * as CategoriesActions from "./categories.actions";

export const initialState: any={}
export const categoriesReducer = createReducer<any>(
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
  )
)