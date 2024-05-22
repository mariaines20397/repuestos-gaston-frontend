import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './model/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  private subscriptions = new Subscription();
  private categoryId!:number;
  private category: any = {};
  public nameSearch!:string;
  public products: any = [];
  public search: any = {};
  public nameCategory:string = '';
  
  constructor(
    private store:Store<{ products:Product, category:any, search: any}>,
    private routeActive: ActivatedRoute,
    private route:Router 
   ){
    this.subscriptions.add(
      this.store
        .select('products')
        .subscribe((products) => this.products = products)
    );
    this.subscriptions.add(
      this.store
        .select('category')
        .subscribe((category) => {
          this.category = category.data
          this.productosPorCategorias();
        })
    );
    this.subscriptions.add(
      this.store
        .select('search')
        .subscribe((search) => {
          this.search = search
          console.log(this.search);
        })
    );
   }
  ngOnInit(): void {
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.nameSearch = this.routeActive.snapshot.paramMap.get('filtrar')!;
    this.store.dispatch(ProductsActions.loadProductsByCategory({id:this.categoryId}));  
  }

  productosPorCategorias(){
    this.category?.forEach((data:any)=>{
      if (data.category_id == this.categoryId) {
        this.nameCategory = data.name;
      }
    })
  }

  productById(id:number){
    this.route.navigate([`/products/${id}`])
  }

}
