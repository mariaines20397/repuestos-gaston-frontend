import { Component, OnInit } from '@angular/core';
import { User } from './model/users.model';
import { AdminUsersService } from './services/admin-users.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit{
  page = 1;
  usuarios:User[]=[];
  searchForm:FormGroup;
  
  constructor(
    private usersServices:AdminUsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
   }
  ngOnInit(): void {
    this.getUsers()
    // this.store.dispatch(ProductosAdminActions.loadProducts());
  }
  getUsers(){
    this.usuarios = this.usersServices.getUsers();   
  }
 search(){
  const filtrar = this.searchForm.value.search;
  // this.router.navigate(['/search'],{
  //   queryParams:{filtrar}
  // })    
  this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
}
mostrarData(usuario:any){
  this.usersServices.disparadorUsuario.emit(usuario);
}
}
