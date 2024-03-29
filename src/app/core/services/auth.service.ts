import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/pages/main/user/model/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario!:User | null;
  private _token!:string | null;

  constructor(
    private http:HttpClient
  ) { }

  
  public get usuario() : User {
    if (this._usuario != null) {
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
     this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as User;
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

  login(user:User): Observable<any>{
    const urlAuth = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp'+':'+'12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic '+ credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', user.username!);
    params.set('password', user.password!);

    return this.http.post(urlAuth, params.toString(), {headers:httpHeaders});
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  tieneRol(rol:string):boolean{
    if (this.usuario.roles?.includes(rol)) {
      return true;
    }
    return false;
  }

  guardarUsuario(accessToken:string):void{
    let payload = this.obtenerDatoToken(accessToken);
    this._usuario = new User();
    this._usuario.username = payload.user_name;
    this._usuario.surname = payload.surname;
    this._usuario.email = payload.email;
    this._usuario.name = payload.name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken:string):void{
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  obtenerDatoToken(accessToken:string):any{
    if (!accessToken != null) {
      return JSON.parse(atob(accessToken?.split('.')[1]));
    }
    return null;
  }

  autenticado():boolean{
    let payload = this.obtenerDatoToken(this.token!);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
}
