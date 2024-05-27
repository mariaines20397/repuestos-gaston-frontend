import { createReducer, on } from "@ngrx/store";
import * as ProductsActions from "./products.actions";

export const initialState: any={}
export const productsAdminReducer = createReducer<any>(
    initialState,
    //load products
    on(
        ProductsActions.loadProducts,
        (state, props):any => ({
            ...state,
            pagination:props.pagination
        })
    ),
    on(
        ProductsActions.loadProductsSuccess,
        (state, props):any => (
          console.log(props),
          
          {          
            ...state,
            data:props.product,
            pegeable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        ProductsActions.loadProductsFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productById
    on(
        ProductsActions.loadProductById,
        (state):any => ({
            ...state
        })
    ),
    on(
        ProductsActions.loadProductByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        ProductsActions.loadProductByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    // modificar producto
  on(
    ProductsActions.editProduct,
    (state, props): any => ({
      ...state,
      data: props.product,
    })
  ),
  on(
    ProductsActions.editProductSuccess,
    (state, props): any => ({
      ...state
    })
  ),
  on(
    ProductsActions.editProductFail,
    (state, props): any => ({
      ...state,
      data:props.error
    })
  ),
  // eliminar producto
  on(
    ProductsActions.deleteProduct,
    (state, props): any => ({
      ...state
    })
  ),
  on(
    ProductsActions.deleteProductSuccess,
    (state, props): any => ({
      ...state
    })
  ),
  on(
    ProductsActions.deleteProductFail,
    (state, props): any => ({
      ...state,
      data:props.error
    })
  ),
  //create product
  on(
    ProductsActions.createProduct,
    (state, props) => ({
      ...state,
      data: props.product,
    })
  ),
  on(
    ProductsActions.createProductSuccess,
    (state, props) => ({
      ...state
    })
  ),
  on(
    ProductsActions.createProductFail,
    (state, props) => ({
      ...state,
      data:props.error
    })
  ),
)