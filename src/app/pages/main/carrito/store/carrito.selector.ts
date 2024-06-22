import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCarritoFeatureState =
createFeatureSelector<any>('cart');
export const selectCarritoState = createSelector(
    selectCarritoFeatureState,
    (state) => state
);