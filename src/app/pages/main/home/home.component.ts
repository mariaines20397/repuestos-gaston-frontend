import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from '../products/model/product.model';
import * as HomeActions from './store/home.actions';
import * as ProductosAdminActions from 'src/app/pages/admin/table-products/store/products.actions';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  page = 1;
  products:any={}
  category: any = {};
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
    private store:Store<{ home:Product }>,
    private sanitizer: DomSanitizer,

    ) {
      _config.interval = 4000;
      _config.pauseOnHover = true;
      _config.showNavigationArrows = false;
      _config.showNavigationIndicators = false;
      // this.subscriptions.add(
       
      // );
        this.store
        .select('home')
        .subscribe((home) => {
          this.products = home;
          console.log(this.products);
          
        })
        this.products.pageable = {
          size:3,
          page:0
        };
      this.store.dispatch(HomeActions.loadHome({pageable:this.products.pageable}));
     
      
  }
  ngOnInit(): void {
   
    this.totalProductos = this.productos.length;
    console.log(this.productos.length);
    console.log(this.category);
  }
 
  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  verProducto(id:number){
    this.router.navigate([`/products/${id}`]);
    this.store.dispatch(ProductosAdminActions.loadProductById({id}));
  }
  pageChange(evento:any){
    if (!Number.isNaN(evento)) {
     this.products.pageable = {
        size:3,
       page: evento != 0 ? evento - 1 : 0 
      };
    }
this.store.dispatch(HomeActions.loadHome({pageable:this.products.pageable}));
  }
}
