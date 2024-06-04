import { createAction, props } from "@ngrx/store";
import { Pegeable, User } from "../model/users.model";

//load users
export const loadUsers = createAction('[AdminUsers] loadUsers',props<{pageable?:Pegeable}>());
export const loadUsersSuccess = createAction('[AdminUsers] loadUsersSuccess',
props<{user:any[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadUsersFail = createAction('[AdminUsers] loadUsersFail',
props<{error:any}>());

//GetById
export const loadUserById = createAction('[AdminUserById] loadUserById',
props<{id:number}>());
export const loadUserByIdSuccess = createAction('[AdminUserById] loadUserByIdSuccess',
props<{user:any}>());
export const loadUserByIdFail = createAction('[AdminUserById] loadUserByIdFail',
props<{error:any}>());
