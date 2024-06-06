import { createAction, props } from "@ngrx/store";
import { User } from "../../main/user/model/users.model";

export const loadLogin = createAction('[Login] loadLogin',
props<{user:any}>());
export const loadLoginSuccess = createAction('[Login] loadLoginSuccess',
props<{user:string, jwt:string}>());
export const loadLoginFail = createAction('[Login] loadLoginFail',
props<{error:any}>());