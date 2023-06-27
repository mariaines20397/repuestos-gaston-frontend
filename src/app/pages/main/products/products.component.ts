import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  product={nombre:'producto 1'}
  constructor(
    private store:Store<{ products:any}>,
    // public authService: AuthService
   ){
   }
  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts({product:this.product}));

  }

}
