import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './model/users.model';
import * as UserActions from './store/user.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  datosUsuario:any[]=[
    {
      id:1,
      name:'María Inés Toledo',
      usuario:'mariainestoledo',
      email:'mariainestoledo20397@gmail.com',
      telefono:3804590089,
      documento:39905178
    }
  ]
  userId!:number;
  constructor(
    private store:Store<{user:User}>,
    private router: Router,
    private routeActive: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.userId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);

    this.store.dispatch(UserActions.loadUserById({id:this.userId}));
  }

  editarUser(id:number){
    this.router.navigate([`/users/profile/edit/${id}`]);
  }

}
