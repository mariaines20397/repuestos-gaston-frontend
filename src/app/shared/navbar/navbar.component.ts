import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin:boolean=false;
  constructor(
    private router:Router
  ){}
  ngOnInit(): void {
    this.isHome();
  }
  isHome(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const includesLogin = url.includes('login') || url.includes('register');        
        includesLogin ? this.isLogin = true : this.isLogin = false;
      }
    });
  }
}
