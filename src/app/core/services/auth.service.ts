import { Injectable } from '@angular/core';
import { User } from 'src/app/pages/main/user/model/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!:User | null;
  private _token!:string | null;

  constructor() {}
  
  public get usuario() : User {
    if (this._usuario != null) {
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('user') != null){
     this._usuario = JSON.parse(sessionStorage.getItem('user')!) as User;
     return this._usuario;
    }
    return new User();
  }

  public get token() : string | null {
    if (this._token != null) {
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
     this._token = sessionStorage.getItem('token')!;
     return this._token;
    }
    return null;
  }

  admin():boolean{
    const data = localStorage.getItem('user');
    if (data) {
      let rol = JSON.parse(data).rol;
      if (rol[0] == 'ROLE_ADMIN') {
        return true;
      }
      return false;
    }
    return false;
  }

  getTokenData(accessToken?:string):any{
    if (accessToken != null) {
      return JSON.parse(atob(accessToken?.split('.')[1]));
    }
    return null;
  }

  authenticated():boolean{
    const data = localStorage.getItem('user');
    if (data) {
      let payload = this.getTokenData(JSON.parse(data).jwt);
      
      if (payload != null) {
        return true;
      }
      return false;
    }
    return false;
   
  }
}
