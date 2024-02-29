import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { User } from "../../main/user/model/users.model";
import { loginReducer } from "./login.reducer";
import { localStorageSync } from 'ngrx-store-localstorage';

export interface AppState {
    user: User;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    user: loginReducer,
  };
  
  function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
      keys: ['user'],
      rehydrate: true,
    })(reducer);
  }
  
  export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];