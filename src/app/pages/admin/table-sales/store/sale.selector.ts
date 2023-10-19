import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSalesFeatureState =
createFeatureSelector<any>('sales');
export const selectSalesState = createSelector(
    selectSalesFeatureState,
    (state) => state
);