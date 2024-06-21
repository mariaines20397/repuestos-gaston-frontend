import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUserSearchFeatureState =
createFeatureSelector<any>('usersSearch');
export const selectUserState = createSelector(
    selectUserSearchFeatureState,
    (state) => state
);