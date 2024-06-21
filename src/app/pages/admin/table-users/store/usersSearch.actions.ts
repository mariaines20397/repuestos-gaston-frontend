import { createAction, props } from "@ngrx/store";
import { Pegeable, User } from "../model/users.model";

//load users by dni
export const loadUsersByDni = createAction('[AdminUsersByDni] loadUsersByDni',props<{dni:string,pageable?:Pegeable}>());
export const loadUsersByDniSuccess = createAction('[AdminUsersByDni] loadUsersByDniSuccess',
props<{user:any[], pageable:Pegeable, totalElements:number, totalPages: number}>());
export const loadUsersByDniFail = createAction('[AdminUsersByDni] loadUsersByDniFail',
props<{error:any}>());
