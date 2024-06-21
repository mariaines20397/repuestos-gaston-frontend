import { createAction, props } from "@ngrx/store";
import { Pegeable, Sale } from "../model/sale.model";


//get by numberSale
export const loadSaleOrderByNumberSale = createAction('[SaleOrderByNumberSale] loadSaleOrderByNumberSale',
props<{numberSale:number, pageable?:Pegeable}>());
export const loadSaleOrderByNumberSaleSuccess = createAction('[SaleOrderByNumberSale] loadSaleOrderByNumberSaleSuccess',
props<{sale:any, pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadSaleOrderByNumberSaleFail = createAction('[SaleOrderByNumberSale] loadSaleOrderByNumberSaleFail',
props<{error:any}>());

