import { createReducer, on } from "@ngrx/store";
import * as UsersSearchActions from "./usersSearch.actions";
import { Pegeable } from "../model/users.model";

export interface UsersSearchState {
    dni: string | null;
    data: any[];
    pageable: Pegeable | null;
    totalElements: number | null;
    totalPages: number | null;
    error: any | null;
  }
  
  export const initialState: UsersSearchState = {
    dni: null,
    data: [],
    pageable: null,
    totalElements: null,
    totalPages: null,
    error: null
  };
export const usersSearchReducer = createReducer<any>(
    initialState,
    //load users by dni
    on(
        UsersSearchActions.loadUsersByDni,
        (state, props):any => ({
            ...state,
            dni:props.dni,
            pageable:props.pageable,
            data: []
        })
    ),
    on(
        UsersSearchActions.loadUsersByDniSuccess,
        (state, props):any => ({
            ...state,
            data:props.user,
            pageable:props.pageable,
            totalPages:props.totalPages,
            totalElements:props.totalElements
        })
    )
    ,
    on(
        UsersSearchActions.loadUsersByDniFail,
        (state, props):any => ({
            ...state,
            data:props.error
        })
    )
)