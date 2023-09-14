import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  isAdmin:boolean = false;
constructor(
  private router: Router
){
  
}
ngOnInit(): void {
  this.viewAdmin();
}
viewAdmin() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isAdmin = url.includes('admin');
      }
    });
  }
}
