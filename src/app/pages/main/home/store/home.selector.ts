import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectHomeFeatureState =
createFeatureSelector<any>('home');
export const selectHomeState = createSelector(
    selectHomeFeatureState,
    (state) => state
);