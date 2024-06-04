import { Component, OnInit } from '@angular/core';
import { User, getAllUser } from './model/users.model';
import { AdminUsersService } from './services/admin-users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import * as UserAdminActions from './store/users.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit{
  userAdmin:any = {};
  searchForm:FormGroup;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search, userAdmin:getAllUser}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
      .select('userAdmin')
      .subscribe((userAdmin) => {
          this.userAdmin = userAdmin;
      })
    );
    this.userAdmin.pageable = {
      size:2,
      page:0
    };
    
    this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdmin.pageable}));
   
   }
  ngOnInit(): void { }
  verUsuario(id:number){
    this.router.navigate([`admin/dashboard/user/view/${id}`]);
    this.store.dispatch(UserAdminActions.loadUserById({id}));
  }
 search(){
  const filtrar = this.searchForm.value.search;
  this.userAdmin.pageable = {
    size:2,
    page:0
  };
  if (filtrar == "") {
    this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdmin.pageable}));
  }else{
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }   
}
pageChange(evento:any){
  if (!Number.isNaN(evento)) {
   this.userAdmin.pageable = {
      size:2,
     page: evento != 0 ? evento - 1 : 0 
    };
  }
this.store.dispatch(UserAdminActions.loadUsers({pageable:this.userAdmin.pageable}));
}
}
