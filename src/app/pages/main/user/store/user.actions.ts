import { createAction, props } from "@ngrx/store";
import { User } from "../model/users.model";

//User
export const loadUser = createAction('[User] loadUser');
export const loadUserSuccess = createAction('[User] loadUserSuccess',
props<{user:User[]}>());
export const loadUserFail = createAction('[User] loadUserFail',
props<{error:any}>());
