import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './model/users.model';
import * as UserActions from './store/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  datosUsuario:any[]=[
    {
      name:'María Inés Toledo',
      usuario:'mariainestoledo',
      email:'mariainestoledo20397@gmail.com',
      telefono:3804590089,
      documento:39905178
    }
  ]
  
  constructor(
    private store:Store<{user:User}>
  ){}
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUser());
  }

}
