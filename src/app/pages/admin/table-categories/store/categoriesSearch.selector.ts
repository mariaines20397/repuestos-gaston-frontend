import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCategoriesSearchFeatureState =
createFeatureSelector<any>('categoriesSearch');
export const selectCategoryState = createSelector(
    selectCategoriesSearchFeatureState,
    (state) => state
);