import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.url.includes('login') ? this.isLogin = true : this.isLogin = false;
  }
}
