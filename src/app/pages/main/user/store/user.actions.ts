import { createAction, props } from "@ngrx/store";
import { User } from "../model/users.model";

//GetUserById
export const loadUserById = createAction('[User] loadUserById',
props<{id:number}>());
export const loadUserByIdSuccess = createAction('[User] loadUserByIdSuccess',
props<{user:User}>());
export const loadUserByIdFail = createAction('[User] loadUserByIdFail',
props<{error:any}>());

//edit user
export const editUser = createAction('[User] editUser',
props<{id:number, user:User}>());
export const editUserSuccess = createAction('[User] editUserSuccess',
props<{user:User}>());
export const editUserFail = createAction('[User] editUserFail',
props<{error:any}>());
