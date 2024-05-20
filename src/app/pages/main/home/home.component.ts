import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from '../products/model/product.model';
import * as HomeActions from './store/home.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  page = 1;
  carousel:string[]=[
    './assets/img/carousel/carousel1.png',
    './assets/img/carousel/carousel2.png',
    './assets/img/carousel/carousel3.png'
  ]
  carouselMobile:string[]=[
    './assets/img/carousel/carousel1-mobile.png',
    './assets/img/carousel/carousel2-mobile.png',
    './assets/img/carousel/carousel3-mobile.png'
  ]
  totalProductos: number = 0;
  productos:any[]=[
    {
      id:1,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      id:2,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      id:3,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      id:4,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      id:5,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      id:6,
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    }
  ]
  constructor(
    private _config: NgbCarouselConfig,
    private router: Router,
    private store:Store<{ product:Product}>,

    ) {
      _config.interval = 4000;
      _config.pauseOnHover = true;
      _config.showNavigationArrows = false;
      _config.showNavigationIndicators = false;
      
      
  }
  ngOnInit(): void {
    this.store.dispatch(HomeActions.loadHome());
    this.totalProductos = this.productos.length;
    console.log(this.productos.length);

  }

  getProduct(id:number){
    this.router.navigate(['/products/' + id]);
  }
 

}
