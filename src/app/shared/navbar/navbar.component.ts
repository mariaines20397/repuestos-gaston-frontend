import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
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

        // includesLogin ? this.isLogin = true : this.isLogin = false;
      }
    });
  }
  search(){
    const filtrar = this.searchForm.value.search;
    this.router.navigate(['/search'],{
      queryParams:{filtrar}
    })    
    
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
