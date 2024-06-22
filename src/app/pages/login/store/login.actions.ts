import { createAction, props } from "@ngrx/store";

export const loadLogin = createAction('[Login] loadLogin',
props<{user:any}>());
export const loadLoginSuccess = createAction('[Login] loadLoginSuccess',
props<{user:string, jwt:string, rol:[]}>());
export const loadLoginFail = createAction('[Login] loadLoginFail',
props<{error:any}>());

//logout
export const loadLogout = createAction('[User] loadLogout');
export const loadLogoutSuccess = createAction('[User] loadLogoutSuccess');
export const loadLogoutFail = createAction('[User] loadLogoutFail',
props<{error:any}>());

export const loadClearUserState = createAction('[User] loadClearUserState',
    props<{user:any}>());