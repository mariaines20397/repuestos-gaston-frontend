import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSearchSaleFeatureState =
createFeatureSelector<any>('searchSale');
export const selectSalesState = createSelector(
    selectSearchSaleFeatureState,
    (state) => state
);