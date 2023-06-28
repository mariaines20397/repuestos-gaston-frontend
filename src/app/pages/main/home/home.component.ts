import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carousel:any[]=[
    './assets/img/carousel/carousel1.png',
    './assets/img/carousel/carousel2.png',
    './assets/img/carousel/carousel3.png'
  ]
  constructor(
    private _config: NgbCarouselConfig
    ) {
      _config.interval = 4000;
      _config.pauseOnHover = true;
      _config.showNavigationArrows = false;
  }
 

}
