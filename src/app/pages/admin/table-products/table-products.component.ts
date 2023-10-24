import { Component, OnInit } from '@angular/core';
import { Product } from './model/product.model';
import { AdminProductsService } from './services/admin-products.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductosAdminActions from './store/products.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit{
  
  page = 1;
  productos:Product[]=[];
  searchForm:FormGroup;

  constructor(
    private productServices:AdminProductsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
   }
  ngOnInit(): void {
    this.getProducts()
    // this.store.dispatch(ProductosAdminActions.loadProducts());
  }
  getProducts(){
    this.productos=this.productServices.getProducts();    
  }
  agregar(){
  this.router.navigate(['admin/dashboard/productos/agregarProducto']);
  }
  editarProducto(id:number){
  this.router.navigate([`admin/dashboard/productos/editarProducto/${id}`]);
  }
  eliminar(id:number){
    // this.store.dispatch(ProductosAdminActions.deleteProduct(id));
 }
 search(){
  const filtrar = this.searchForm.value.search;
  // this.router.navigate(['/search'],{
  //   queryParams:{filtrar}
  // })    
  this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
}
}
