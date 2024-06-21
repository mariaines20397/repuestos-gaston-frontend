import { createReducer, on } from "@ngrx/store";
import * as CategoriesSearchActions from "./categoriesSearch.actions";

export const initialState: any={}
export const categoriesSearchReducer = createReducer<any>(
    initialState,
    
  //load products by name
  on(
    CategoriesSearchActions.loadCategoriesByName,
    (state, props):any => (
      {
        ...state,
        filter: props.filter,
        pageable:props.pageable
    })
),
on(
    CategoriesSearchActions.loadCategoriesByNameSuccess,
    (state, props):any => (        
      {
        ...state,
        data:props.category,
        pageable:props.pageable,
        totalPages:props.totalPages,
        totalElements:props.totalElements
    })
),
on(
  CategoriesSearchActions.loadCategoriesByNameFail,
  (state, props) => ({
    ...state,
    data:props.error
  })
)
)