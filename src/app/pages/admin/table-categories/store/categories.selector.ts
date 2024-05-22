import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCategoryAdminFeatureState =
createFeatureSelector<any>('categoryAdmin');
export const selectCategoryState = createSelector(
    selectCategoryAdminFeatureState,
    (state) => state
);