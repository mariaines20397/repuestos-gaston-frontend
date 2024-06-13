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
    //create sales admin
    on(
        SaleActions.createSaleAdmin,
        (state, props):any => ({
            ...state,
            data:props.products
        })
    ),
    on(
        SaleActions.createSaleAdminSuccess,
        (state, props):any => ({
            ...state,
            data:props.prueba
        })
    )
    ,
    on(
        SaleActions.createSaleAdminFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    ),
)