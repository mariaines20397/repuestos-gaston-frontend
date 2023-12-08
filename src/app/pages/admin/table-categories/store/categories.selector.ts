import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCategoryFeatureState =
createFeatureSelector<any>('category');
export const selectCategoryState = createSelector(
    selectCategoryFeatureState,
    (state) => state
);