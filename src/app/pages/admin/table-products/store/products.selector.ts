import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectProductFeatureState =
createFeatureSelector<any>('product');
export const selectProductState = createSelector(
    selectProductFeatureState,
    (state) => state
);