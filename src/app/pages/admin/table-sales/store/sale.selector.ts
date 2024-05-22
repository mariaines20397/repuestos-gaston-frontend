import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSalesAdminFeatureState =
createFeatureSelector<any>('salesAdmin');
export const selectSalesState = createSelector(
    selectSalesAdminFeatureState,
    (state) => state
);