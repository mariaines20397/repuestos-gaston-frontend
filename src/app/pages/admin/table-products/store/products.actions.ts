import { createAction, props } from "@ngrx/store";
import { Pegeable, Product } from "../model/product.model";

//load products
export const loadProducts = createAction('[AdminProducts] loadProducts',props<{pageable?:Pegeable}>());
export const loadProductsSuccess = createAction('[AdminProducts] loadProductsSuccess',
props<{product:Product[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadProductsFail = createAction('[AdminProducts] loadProductsFail',
props<{error:any}>());

//edit products
export const editProduct = createAction('[AdminProducts] editProduct',
props<{id:number, product:any}>());
export const editProductSuccess = createAction('[AdminProducts] editProductSuccess');
export const editProductFail = createAction('[AdminProducts] editProductFail',
props<{error:any}>());

//delete products
export const deleteProduct = createAction('[AdminProducts] deleteProduct',
props<{id:number}>());
export const deleteProductSuccess = createAction('[AdminProducts] deleteProductSuccess');
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
    '[AdminProducts] createProductSuccess'
  );
  export const createProductFail = createAction(
    '[AdminProducts] createProductFail',
    props<{ error: any }>()
  );

  export const loadProductByLowStock = createAction('[AdminProductLowStock] loadProductByLowStock',
    props<{pageable?:Pegeable}>());
    export const loadProductByLowStockSuccess = createAction('[AdminProductLowStock] loadProductByLowStockSuccess',
    props<{products:Product[], pageable:Pegeable, totalElements:number, totalPages: number}>());
    export const loadProductByLowStockFail = createAction('[AdminProductLowStock] loadProductByLowStockFail',
    props<{error:any}>());