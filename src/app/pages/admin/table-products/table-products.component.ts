import { Component, OnInit } from '@angular/core';
import { Product } from './model/product.model';
import { AdminProductsService } from './services/admin-products.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductosAdminActions from './store/products.actions';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit{
  
  page = 1;
  productos:Product[]=[]
  constructor(
    private productServices:AdminProductsService,
    private router: Router,
    private store:Store
  ) { }
  ngOnInit(): void {
    this.getProducts()
    // this.store.dispatch(ProductosAdminActions.loadProducts());
  }
  getProducts(){
    this.productos=this.productServices.getProducts();
  }
  agregar(){
  this.router.navigate(['admin/productos/agregarProducto']);
  }
  editarProducto(id:number){
  this.router.navigate([`admin/productos/editarProducto/${id}`]);
  }
  eliminar(id:number){
    // this.store.dispatch(ProductosAdminActions.deleteProduct(id));
 }
}
