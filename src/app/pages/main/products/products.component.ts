import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './model/product.model';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import * as SearchActions from 'src/app/shared/navbar/store/search.actions'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  private subscriptions = new Subscription();
  public categoryId!:number;
  public category: any = {};
  public nameSearch!:string;
  public products: any = [];
  public search: any = {};
  public nameCategory:string = '';
  
  constructor(
    private store:Store<{ product:any, category:any, search: any}>,
    private routeActive: ActivatedRoute,
    private route:Router,
    private sanitizer: DomSanitizer
   ){
    this.subscriptions.add(
      this.store
        .select('product')
        .subscribe((product) => {
          this.products = product
        console.log(this.products);
        
        })
    );
    this.subscriptions.add(
      this.store
        .select('category')
        .subscribe((category) => {
          this.category = category.data;
          console.log(this.category);
          
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
    if (this.categoryId) {
      console.log(this.categoryId);
      
      this.store.dispatch(ProductsActions.loadProductsByCategory({id:this.categoryId,pageable:this.products.pageable})); 
    }
    if (this.nameSearch) {   
    this.store.dispatch(SearchActions.loadSearch({filter:this.nameSearch,pageable:this.search.pageable}));
    }
  }

  productosPorCategorias(){
    this.category?.forEach((data:any)=>{
      if (data.category_id == this.categoryId) {
        this.nameCategory = data.name;
      }
    })
  }

  productById(id:number){
    console.log(id);
    
    this.route.navigate([`/products/${id}`]);
    this.store.dispatch(ProductsActions.loadProductById({id})); 
  }

  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  pageChange(evento:any){
    if (!Number.isNaN(evento)) {
     this.products.pageable = {
        size:2,
       page: evento != 0 ? evento - 1 : 0 
      };
    }
if (this.categoryId) {
  this.store.dispatch(ProductsActions.loadProductsByCategory({id:this.categoryId,pageable:this.category.pageable})); 
}
if (this.nameSearch) {   
this.store.dispatch(SearchActions.loadSearch({filter:this.nameSearch,pageable:this.search.pageable}));
}
  }
}
