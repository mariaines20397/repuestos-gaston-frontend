import { createAction, props } from "@ngrx/store";
import { Sale } from "../model/sale.model";

//load users
export const loadSales = createAction('[AdminSales] loadSales');
export const loadSalesSuccess = createAction('[AdminSales] loadSalesSuccess',
props<{sales:Sale[]}>());
export const loadSalesFail = createAction('[AdminSales] loadSalesFail',
props<{error:any}>());

//GetById
export const loadSaleByIdUser = createAction('[AdminSaleByIdUser] loadSaleByIdUser',
props<{id:number}>());
export const loadSaleByIdUserSuccess = createAction('[AdminSaleByIdUser] loadSaleByIdUserSuccess',
props<{sale:Sale}>());
export const loadSaleByIdUserFail = createAction('[AdminSaleByIdUser] loadSaleByIdUserFail',
props<{error:any}>());

//GetById
export const loadProductByBarCode = createAction('[AdminProductByBarCode] loadProductByBarCode',
    props<{barCode:number}>());
    export const loadProductByBarCodeSuccess = createAction('[AdminProductByBarCode] loadProductByBarCodeSuccess',
    props<{product:any}>());
    export const loadProductByBarCodeFail = createAction('[AdminProductByBarCode] loadProductByBarCodeFail',
    props<{error:any}>());

