import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUserFeatureState =
createFeatureSelector<any>('user');
export const selectUserState = createSelector(
    selectUserFeatureState,
    (state) => state
);