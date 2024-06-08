import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCarritoAdminFeatureState =
createFeatureSelector<any>('carritoAdmin');
export const selectSalesState = createSelector(
    selectCarritoAdminFeatureState,
    (state) => state
);