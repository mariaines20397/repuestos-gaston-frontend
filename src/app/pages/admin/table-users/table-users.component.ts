import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, getAllUser } from './model/users.model';
import { AdminUsersService } from './services/admin-users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import * as UserAdminActions from './store/users.actions'
import * as UserSearchActions from './store/usersSearch.actions'
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit, OnDestroy{
  private unsubscribe$ = new Subject<void>();
  userAdmin:any[]= [];
  userAdminComplete:any = {};
  userAdminPagination:any = {};
  searchForm:FormGroup;
  private subscriptions = new Subscription();
  private isSearching: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ usersSearch:any, userAdmin:any}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
      .select('userAdmin')
      .subscribe((userAdmin) => {
        if (!this.isSearching) {
           this.userAdminComplete = userAdmin;
          this.userAdmin = userAdmin.data;
          this.userAdminPagination = userAdmin.pageable;
        }
      })
    );
    this.subscriptions.add(
    this.store
    .select('usersSearch')
    .subscribe((usersSearch) => {
      if (this.isSearching) {
      this.userAdminComplete = usersSearch;
      this.userAdmin = usersSearch.data;
      this.userAdminPagination = usersSearch.pageable;
    }
    }))
    this.userAdminPagination = {
      size:2,
      page:0
    };
    
    this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdminPagination}));
   
   }
  ngOnInit(): void { }
  verUsuario(id:number){
    this.router.navigate([`admin/dashboard/user/view/${id}`]);
    this.store.dispatch(UserAdminActions.loadUserById({id}));
  }
  search(){
    const filtrar = this.searchForm.value.search;
    this.userAdminPagination = {
      size:2,
      page:0
    };
    
    if (filtrar != "") {
      this.isSearching = true;
      this.store.dispatch(UserSearchActions.loadUsersByDni({dni:filtrar,pageable:this.userAdminPagination}));
    }else{
      this.isSearching = false;
      this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdminPagination}));
    }
  }
pageChange(evento:any){
  if (!Number.isNaN(evento)) {
   this.userAdminPagination = {
      size:2,
     page: evento != 0 ? evento - 1 : 0 
    };
  }
this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdminPagination}));
}
ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
}
