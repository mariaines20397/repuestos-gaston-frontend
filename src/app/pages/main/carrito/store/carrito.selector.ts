import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCarritoFeatureState =
createFeatureSelector<any>('carrito');
export const selectCarritoState = createSelector(
    selectCarritoFeatureState,
    (state) => state
);