import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectProductAdminFeatureState =
createFeatureSelector<any>('productAdmin');
export const selectProductState = createSelector(
    selectProductAdminFeatureState,
    (state) => state
);