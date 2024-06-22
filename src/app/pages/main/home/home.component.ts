import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Product } from '../products/model/product.model';
import * as HomeActions from './store/home.actions';
import * as ProductosAdminActions from 'src/app/pages/admin/table-products/store/products.actions';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any = {}
  carousel: string[] = [
    './assets/img/carousel/carousel1.png',
    './assets/img/carousel/carousel2.png',
    './assets/img/carousel/carousel3.png'
  ]
  carouselMobile: string[] = [
    './assets/img/carousel/carousel1-mobile.png',
    './assets/img/carousel/carousel2-mobile.png',
    './assets/img/carousel/carousel3-mobile.png'
  ]
  constructor(
    private _config: NgbCarouselConfig,
    private router: Router,
    private store: Store<{ home: Product }>,
    private sanitizer: DomSanitizer,

  ) {
    _config.interval = 4000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;
    _config.showNavigationIndicators = false;
    this.store
      .select('home')
      .subscribe((home) => {
        this.products = home;
      })
    this.products.pageable = {
      size: 3,
      page: 0
    };
    this.store.dispatch(HomeActions.loadHome({ pageable: this.products.pageable }));


  }

  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  public viewProduct(id: number): void {
    this.router.navigate([`/products/${id}`]);
    this.store.dispatch(ProductosAdminActions.loadProductById({ id }));
  }
  public pageChange(event: any): void {
    if (!Number.isNaN(event)) {
      this.products.pageable = {
        size: 3,
        page: event != 0 ? event - 1 : 0
      };
    }
    this.store.dispatch(HomeActions.loadHome({ pageable: this.products.pageable }));
  }
}
