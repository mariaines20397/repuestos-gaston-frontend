import { createReducer, on } from "@ngrx/store";
import * as SaleActions from './sale.actions';

export const initialState: any={}
export const salesAdminReducer = createReducer<any>(
    initialState,
    //load sales
    on(
        SaleActions.loadSales,
        (state, props):any => ({
            ...state,
            pageable:props.pageable
        })
    ),
    on(
        SaleActions.loadSalesSuccess,
        (state, props):any => ({
            ...state,
            data:props.sales,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        SaleActions.loadSalesFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //saleByIdUser
    on(
        SaleActions.loadSaleById,
        (state,props):any => ({
            ...state,
            data:props.id
        })
    ),
    on(
        SaleActions.loadSaleByIdSuccess,
        (state, props):any => ({
            ...state,
            data:props.sale
        })
    )
    ,
    on(
        SaleActions.loadSaleByIdFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //productByBarCode
    on(
        SaleActions.loadProductByBarCode,
        (state, props):any => ({
            ...state,
            barCode:props.barCode
        })
    ),
    on(
        SaleActions.loadProductByBarCodeSuccess,
        (state, props):any => ({
            ...state,
            data:props.product
        })
    )
    ,
    on(
        SaleActions.loadProductByBarCodeFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //load sales by number
    on(
        SaleActions.loadSaleByNumber,
        (state, props):any => ({
            ...state,
            data:props.pageable
        })
    ),
    on(
        SaleActions.loadSaleByNumberSuccess,
        (state, props):any => ({
            ...state,
            data:props.sales,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        SaleActions.loadSaleByNumberFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //create sales
    on(
        SaleActions.createSale,
        (state, props):any => ({
            ...state
        })
    ),
    on(
        SaleActions.createSaleSuccess,
        (state, props):any => ({
            ...state,
            data:props.sale
        })
    )
    ,
    on(
        SaleActions.createSaleFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
    //update status
    on(
        SaleActions.loadUpdateStatus,
        (state, props):any => ({
            ...state,
            id:props.id,
            status:props.status
        })
    ),
    on(
        SaleActions.loadUpdateStatusSuccess,
        (state, props):any => ({
            ...state,
            data:props.sales
        })
    )
    ,
    on(
        SaleActions.loadUpdateStatusFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)