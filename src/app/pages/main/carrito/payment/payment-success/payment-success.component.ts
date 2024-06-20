import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as CarritoActions from '../../store/carrito.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  carrito: any = [];
  totalPrice: any;

  constructor(private store: Store<{ carrito: any }>,
    private sanitizer: DomSanitizer,
    private router:Router
  ) {
    this.store
      .select('carrito')
      .subscribe((carrito) => {
        this.carrito = carrito.data;
        this.calculateTotalPrice(carrito.data.products);
      });
  }

  ngOnInit(): void {
    this.store.dispatch(CarritoActions.createSale());
  }

  calculateTotalPrice(products:any){
    this.totalPrice = 0;
    products.forEach((data:any)=>{
      this.totalPrice += data.sub_total_price
    })
  }
  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  home(){
    this.router.navigate(['/home'])
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
