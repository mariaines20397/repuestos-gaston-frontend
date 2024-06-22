import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { Search } from './model/search.model';
import * as SearchActions from './store/search.actions'
import { User } from 'src/app/pages/main/user/model/users.model';
import { Subscription } from 'rxjs';
import * as UserActions from 'src/app/pages/main/user/store/user.actions';
import * as CategoriasActions from 'src/app/shared/navbar/store/categories.actions';
import * as LoginActions from 'src/app/pages/login/store/login.actions';
import { getAllCategory } from 'src/app/pages/admin/table-categories/model/category.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean = false;
  public isAdmin:boolean = false;
  public isSearch:boolean = false;
  public isMenu:boolean = false;
  public category: any = {};
  public searchForm:FormGroup;
  public user: any = {};
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
          .subscribe((category) =>{
            this.category = category;       
          })
      );
      

    }
  ngOnInit(): void {
    this.isHome();
    this.store.dispatch(CategoriasActions.loadCategories());
  }
  private isHome() : void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isLogin = url.includes('login') || url.includes('register');
        this.isAdmin = url.includes('admin');
      }
    });
  }
  public search() : void {
    const filtrar = this.searchForm.value.search;
    this.router.navigate([`/search/${filtrar}`])    
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }
  public selectSearch():boolean{
    this.isSearch = !this.isSearch;
    return this.isSearch;
  }
  public selectMenu():boolean{
    this.isMenu = !this.isMenu;
    return this.isMenu;
  }
  public register() : void {
    this.isMenu = false;
    this.router.navigate(['/register']);
  }
  public login() : void {
    this.isMenu = false;
    this.router.navigate(['/login']);
  }
  public cart() : void {
    this.router.navigate(['/carrito']);
  }
  public logout() : void {
    this.store.dispatch(LoginActions.loadLogout());
  }

  public filterProductsByCategory(id:number) : void {
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

  public profile() : void {
    this.store.dispatch(UserActions.loadProfile());
  }
  public back() : void {
    this.router.navigate(['/admin']);
  }
}
