import { createAction, props } from "@ngrx/store";
import { User } from "../../register/model/users.model";

export const loadRegister = createAction('[Register] loadRegister',
props<{user:any}>());
export const loadRegisterSuccess = createAction('[Register] loadRegisterSuccess',
props<{user:any[]}>());
export const loadRegisterFail = createAction('[Register] loadRegisterFail',
props<{error:any}>());