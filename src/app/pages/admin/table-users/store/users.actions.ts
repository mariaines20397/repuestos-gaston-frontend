import { createAction, props } from "@ngrx/store";
import { User } from "../model/users.model";

//load users
export const loadUsers = createAction('[AdminUsers] loadUsers');
export const loadUsersSuccess = createAction('[AdminUsers] loadUsersSuccess',
props<{user:User[]}>());
export const loadUsersFail = createAction('[AdminUsers] loadUsersFail',
props<{error:any}>());

//GetById
export const loadUserById = createAction('[AdminUserById] loadUserById',
props<{id:number}>());
export const loadUserByIdSuccess = createAction('[AdminUserById] loadUserByIdSuccess',
props<{user:User}>());
export const loadUserByIdFail = createAction('[AdminUserById] loadUserByIdFail',
props<{error:any}>());
