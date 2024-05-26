import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/pages/main/products/model/product.model";
import { User } from "src/app/pages/main/user/model/users.model";

//search
export const loadSearch = createAction('[Search] loadSearch',
props<{filter:string}>());
export const loadSearchSuccess = createAction('[Search] loadSearchSuccess',
props<{product:Product[]}>());
export const loadSearchFail = createAction('[Search] loadSearchFail',
props<{error:any}>());

//logout
export const loadLogout = createAction('[Search] loadLogout',
props<{user:User}>());
export const loadLogoutSuccess = createAction('[Search] loadLogoutSuccess',
props<{message:Object}>());
export const loadLogoutFail = createAction('[Search] loadLogoutFail',
props<{error:any}>());
