import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectUserAdminFeatureState =
createFeatureSelector<any>('userAdmin');
export const selectUserState = createSelector(
    selectUserAdminFeatureState,
    (state) => state
);