import { createAction, props } from "@ngrx/store";

export const loadRegister = createAction('[Register] loadRegister',
props<{user:any}>());
export const loadRegisterSuccess = createAction('[Register] loadRegisterSuccess');
export const loadRegisterFail = createAction('[Register] loadRegisterFail',
props<{error:any}>());