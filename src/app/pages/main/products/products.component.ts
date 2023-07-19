import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  product={nombre:'producto 1'}
  categoryId!:number;
  constructor(
    private store:Store<{ products:any}>,
    private routeActive: ActivatedRoute,

    // public authService: AuthService
   ){
   }
  ngOnInit(): void {
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get('id')!)

    this.store.dispatch(ProductsActions.loadProductsByCategory({id:this.categoryId}));

  }

}
