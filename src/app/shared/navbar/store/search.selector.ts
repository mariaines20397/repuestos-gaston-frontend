import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSearchFeatureState =
createFeatureSelector<any>('search');
export const selectSearchState = createSelector(
    selectSearchFeatureState,
    (state) => state
);