import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectRegisterFeatureState =
createFeatureSelector<any>('register');
export const selectRegisterState = createSelector(
    selectRegisterFeatureState,
    (state) => state
);