import { createReducer, on } from "@ngrx/store";
import * as HomeActions from "./home.actions";
import * as CategoriesActions from '../store/home.actions'

export const initialState: any={}
export const homeReducer = createReducer<any>(
    initialState,
    // on(
    //     CategoriesActions.loadCategories,
    //     (state, props):any => (
    //       console.log(props),
    //       {
    //         ...state
    //     })
    // ),
    // on(
    //     CategoriesActions.loadCategoriesSuccess,
    //     (state, props):any => (
    //       console.log(props),
          
    //       {
    //         ...state,
    //         data:props.category
    //     })
    // )
    // ,
    // on(
    //     CategoriesActions.loadCategoriesFail,
    //     (state, props):any => ({
    //         ...state,
    //         data:props.error
    //     })
    // ),
    on(
        HomeActions.loadHome,
        (state, props):any => ({
            ...state,
            pageable:props.pageable
        })
    ),
    on(
        HomeActions.loadHomeSuccess,
        (state, props):any => ({
            ...state,
            data:props.products,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        HomeActions.loadHomeFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)