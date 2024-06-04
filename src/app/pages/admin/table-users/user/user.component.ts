import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../model/users.model';
import { AdminUsersService } from '../services/admin-users.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as UserAdminActions from '../store/users.actions'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  userForm:FormGroup;
  user:User={};
  private idUser!: number;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private routeActive: ActivatedRoute,
    private store:Store<{ userAdmin:any }>
  ) {
    this.userForm = this.formBuilder.group({
                  name:new FormControl(null),
                  surname:new FormControl(null),
                  dni:new FormControl(null),
                  birthday:new FormControl(null),
                  username:new FormControl(null),
                  email:new FormControl(null),
           });
           this.subscriptions.add(
            this.store
            .select('userAdmin')
            .subscribe((userAdmin) => this.user = userAdmin)
          );
          this.store
                .select(state => state.userAdmin)
                .subscribe((userAdmin) => {
                  this.user = userAdmin;
                  this.getByUser(this.user);
                })       
  }
  ngOnInit(): void {
    this.idUser = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    if (this.idUser) {
      this.store.dispatch(UserAdminActions.loadUserById({id:this.idUser}));
    }
  }
getByUser(user:any){
  this.userForm.patchValue({
    name: user.data?.name,
    surname:user.data?.surname,
    dni:user.data?.dni,
    birthday:user.data?.birthday,
    username:user.data?.username,
    email:user.data?.email
  })  
}
  public back() : void{
    this.router.navigate(['/admin/dashboard/user'])
  }
}
