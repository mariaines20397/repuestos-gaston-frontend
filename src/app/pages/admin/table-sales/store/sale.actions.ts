import { createAction, props } from "@ngrx/store";
import { Pegeable, Sale } from "../model/sale.model";

//load users
export const loadSales = createAction('[AdminSales] loadSales',props<{pageable?:Pegeable}>());
export const loadSalesSuccess = createAction('[AdminSales] loadSalesSuccess',
props<{sales:Sale[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadSalesFail = createAction('[AdminSales] loadSalesFail',
props<{error:any}>());

//GetById
export const loadSaleById = createAction('[AdminSaleByNumber] loadSaleById',
props<{id:number}>());
export const loadSaleByIdSuccess = createAction('[AdminSaleByNumber] loadSaleByIdSuccess',
props<{sale:Sale}>());
export const loadSaleByIdFail = createAction('[AdminSaleByNumber] loadSaleByIdFail',
props<{error:any}>());

//create sale 
export const createSale = createAction('[createSale] createSale');
    export const createSaleSuccess = createAction('[createSale] createSaleSuccess',
    props<{sale:any}>());
    export const createSaleFail = createAction('[createSale] createSaleFail',
    props<{error:any}>());

//GetById
export const loadProductByBarCode = createAction('[AdminProductByBarCode] loadProductByBarCode',
    props<{barCode:number}>());
    export const loadProductByBarCodeSuccess = createAction('[AdminProductByBarCode] loadProductByBarCodeSuccess',
    props<{product:any}>());
    export const loadProductByBarCodeFail = createAction('[AdminProductByBarCode] loadProductByBarCodeFail',
    props<{error:any}>());

//loadSaleByNumber
export const loadSaleByNumber = createAction('[SaleByNumber] loadSaleByNumber',
props<{pageable?:Pegeable}>());
export const loadSaleByNumberSuccess = createAction('[SaleByNumber] loadSaleByNumberSuccess',
props<{sales:Sale[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadSaleByNumberFail = createAction('[SaleByNumber] loadSaleByNumberFail',
props<{error:any}>());

//update status
export const loadUpdateStatus = createAction('[UpdateStatus] loadUpdateStatus',
props<{id:number, status:string}>());
export const loadUpdateStatusSuccess = createAction('[UpdateStatus] loadUpdateStatusSuccess',
props<{sales:any}>());
export const loadUpdateStatusFail = createAction('[UpdateStatus] loadUpdateStatusFail',
props<{error:any}>());


