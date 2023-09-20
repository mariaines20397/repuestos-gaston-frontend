import { createAction, props } from "@ngrx/store";
import { Product } from "../model/product.model";

//load products
export const loadProducts = createAction('[AdminProducts] loadProducts');
export const loadProductsSuccess = createAction('[AdminProducts] loadProductsSuccess',
props<{product:Product[]}>());
export const loadProductsFail = createAction('[AdminProducts] loadProductsFail',
props<{error:any}>());

//edit products
export const editProduct = createAction('[AdminProducts] editProduct',
props<{id:number, product:Product}>());
export const editProductSuccess = createAction('[AdminProducts] editProductSuccess',
props<{product:Product[]}>());
export const editProductFail = createAction('[AdminProducts] editProductFail',
props<{error:any}>());

//delete products
export const deleteProduct = createAction('[AdminProducts] deleteProduct',
props<{id:number}>());
export const deleteProductSuccess = createAction('[AdminProducts] deleteProductSuccess',
props<{product:Product}>());
export const deleteProductFail = createAction('[AdminProducts] deleteProductFail',
props<{error:any}>());

//GetById
export const loadProductById = createAction('[AdminProductById] loadProductById',
props<{id:number}>());
export const loadProductByIdSuccess = createAction('[AdminProductById] loadProductByIdSuccess',
props<{product:Product}>());
export const loadProductByIdFail = createAction('[AdminProductById] loadProductByIdFail',
props<{error:any}>());

//create producto
export const createProduct = createAction(
    '[AdminProducts] createProduct',
    props<{ product: Product }>()
  );
  export const createProductSuccess = createAction(
    '[AdminProducts] createProductSuccess',
    props<{ product: Product }>()
  );
  export const createProductFail = createAction(
    '[AdminProducts] createProductFail',
    props<{ error: any }>()
  );