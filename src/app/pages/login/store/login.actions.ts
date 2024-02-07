import { createAction, props } from "@ngrx/store";
import { User } from "../../main/user/model/users.model";

export const loadLogin = createAction('[Login] loadLogin',
props<{user:User}>());
export const loadLoginSuccess = createAction('[Login] loadLoginSuccess',
props<{user:User[]}>());
export const loadLoginFail = createAction('[Login] loadLoginFail',
props<{error:any}>());