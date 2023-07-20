import { createAction, props } from "@ngrx/store";

export const loadRegister = createAction('[Register] loadRegister',
props<{user:any}>());
export const loadRegisterSuccess = createAction('[Register] loadRegisterSuccess',
props<{user:any[]}>());
export const loadRegisterFail = createAction('[Register] loadRegisterFail',
props<{error:any}>());