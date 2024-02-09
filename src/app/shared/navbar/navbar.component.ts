import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { Search } from './model/search.model';
import * as SearchActions from './store/search.actions'
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
  searchForm:FormGroup;
  categories:any[]=[
    {
      id:1,
      name:'Accesorios'
    },
    {
      id:2,
      name:'Caños de escape'
    },
    {
      id:3,
      name:'Aceites'
    }
  ]
  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search}>,
    // public authService: AuthService
    ) {
      this.searchForm = this.formBuilder.group({
        search: new FormControl(null)
      });
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
    this.router.navigate(['/search'],{
      queryParams:{filtrar}
    })    
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
  // logout() {
  //   const username = this.authService.usuario.username;
  //   this.authService.logout();
  //   Swal.fire(
  //     '¡Hasta pronto!',
  //     `${username} has cerrado sesión con éxito`,
  //     'success'
  //   );
  //   this.router.navigate(['/login']);
  // }
}
