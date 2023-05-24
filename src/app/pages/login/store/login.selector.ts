import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectLoginFeatureState =
createFeatureSelector<any>('login');
export const selectLoginState = createSelector(
    selectLoginFeatureState,
    (state) => state
);