import { createAction, props } from "@ngrx/store";
import { User } from "../model/users.model";

//edit user
export const editUser = createAction('[User] editUser',
props<{id:number, user:User}>());
export const editUserSuccess = createAction('[User] editUserSuccess',
props<{user:User}>());
export const editUserFail = createAction('[User] editUserFail',
props<{error:any}>());

//logout
export const loadLogout = createAction('[User] loadLogout');
export const loadLogoutSuccess = createAction('[User] loadLogoutSuccess');
export const loadLogoutFail = createAction('[User] loadLogoutFail',
props<{error:any}>());

//profile
export const loadProfile = createAction('[User] loadProfile');
export const loadProfileSuccess = createAction('[User] loadProfileSuccess',
props<{user:User}>());
export const loadProfileFail = createAction('[User] loadProfileFail',
props<{error:any}>());
