import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carousel:string[]=[
    './assets/img/carousel/carousel1.png',
    './assets/img/carousel/carousel2.png',
    './assets/img/carousel/carousel3.png'
  ]
  productos:any[]=[
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    },
    {
      img:'./assets/img/productos/motul.png',
      tile:'Motul 5100',
      subtitle:'Aceite para moto 4t',
      precio:1000
    }    
  ]
  constructor(
    private _config: NgbCarouselConfig
    ) {
      _config.interval = 4000;
      _config.pauseOnHover = true;
      _config.showNavigationArrows = false;
  }
 

}
