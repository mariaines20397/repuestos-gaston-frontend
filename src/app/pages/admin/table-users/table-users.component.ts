import { Component, OnInit } from '@angular/core';
import { User } from './model/users.model';
import { AdminUsersService } from './services/admin-users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit{
  page = 1;
  users:User[]=[];

  constructor(
    private usersServices:AdminUsersService,
    private router: Router,
    private store:Store
  ) { }

  ngOnInit(): void {
    this.getUsers()
    // this.store.dispatch(UsersAdminActions.loadUsers());
  }
  getUsers(){
    this.users=this.usersServices.getUsers();
  }
  ver(id:number){
  this.router.navigate([`admin/usuarios/ver/${id}`]);
  }
}
