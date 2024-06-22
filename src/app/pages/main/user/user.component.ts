import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './model/users.model';
import * as UserActions from './store/user.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  private subscriptions = new Subscription();
  public user:any = {};

  constructor(
    private store:Store<{user:User}>,
    private router: Router
  ){
    this.subscriptions.add(
      this.store
        .select('user')
        .subscribe((user) => {
          this.user = user;
        })
    );
  }
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadProfile());
  }

  public editUser() : void {
    this.router.navigate([`/users/profile/edit`]);
    this.store.dispatch(UserActions.loadProfile());
  }

}
