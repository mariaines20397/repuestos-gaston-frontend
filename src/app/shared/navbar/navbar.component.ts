import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { Search } from './model/search.model';
import * as SearchActions from './store/search.actions'
import { User } from 'src/app/pages/main/user/model/users.model';
import { Subscription } from 'rxjs';
import { loadLoginSuccess } from 'src/app/pages/login/store/login.actions';
import * as UserActions from 'src/app/pages/main/user/store/user.actions';
import * as CategoriasActions from 'src/app/shared/navbar/store/categories.actions';
import * as ProductsActions from 'src/app/pages/main/products/store/products.actions';
import { getAllCategories, getAllCategory } from 'src/app/pages/admin/table-categories/model/category.model';
import { Product } from 'src/app/pages/main/products/model/product.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin:boolean = false;
  isSearch:boolean = false;
  isMenu:boolean = false;
  category: any = {};
  searchForm:FormGroup;
  user: any = {};
  private subscriptions = new Subscription();

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search, user: User, category: getAllCategory }>,
    public authService: AuthService
    ) {
      this.searchForm = this.formBuilder.group({
        search: new FormControl(null)
      });
      this.subscriptions.add(
        this.store
          .select('user')
          .subscribe((user) => {
            this.user = user;
          } )
      );
      this.subscriptions.add(
        this.store
          .select('category')
          .subscribe((category) => this.category = category)
      );
      // this.subscriptions.add(this.store.select('user').subscribe(user => (this.user = user)));
      // this.store.dispatch(HomeActions.loadCategories());
      this.store.dispatch(CategoriasActions.loadCategories());

    }
  ngOnInit(): void {
    this.isHome();
  }
  isHome() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isLogin = url.includes('login') || url.includes('register');
        this.isAdmin = url.includes('admin');
        // includesLogin ? this.isLogin = true : this.isLogin = false;
      }
    });
  }
  search(){
    const filtrar = this.searchForm.value.search;
    this.router.navigate([`/search/${filtrar}`])    
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }
  selectSearch():boolean{
    this.isSearch = !this.isSearch;
    return this.isSearch;
  }
  selectMenu():boolean{
    this.isMenu = !this.isMenu;
    return this.isMenu;
  }
  register(){
    this.isMenu = false;
    this.router.navigate(['/register']);
  }
  login(){
    this.isMenu = false;
    this.router.navigate(['/login']);
  }
  cart(){
    this.router.navigate(['/carrito']);
  }
  logout(event:any) {
    event.preventDefault();
    this.store.dispatch(SearchActions.loadLogout());
  }

  filterProductsByCategory(id:number){
    this.router.navigate([`/products/categories/${id}`]);
    const paginacion = {
      pageNumber:0,
      pageSize:2,
      offset:0,
      paged:true,
      unpaged:false,
      sort:{
        empty:false,
        sorted:true,
        unsorted:false
      }
    }
    this.store.dispatch(CategoriasActions.loadProductsByCategory({id, pageable:paginacion}))
  }

  profile(){
    this.store.dispatch(UserActions.loadProfile());
  }
}
