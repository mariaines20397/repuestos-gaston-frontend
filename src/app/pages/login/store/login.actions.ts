import { createAction, props } from "@ngrx/store";
import { User } from "../../register/model/users.model";

export const loadLogin = createAction('[Login] loadLogin',
props<{user:any}>());
export const loadLoginSuccess = createAction('[Login] loadLoginSuccess',
props<{user:any[]}>());
export const loadLoginFail = createAction('[Login] loadLoginFail',
props<{error:any}>());