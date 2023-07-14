import { createAction, props } from "@ngrx/store";

export const loadHome = createAction('[Home] loadHome');
export const loadHomeSuccess = createAction('[Home] loadHomeSuccess',
props<{products:any[]}>());
export const loadHomeFail = createAction('[Home] loadHomeFail',
props<{error:any}>());