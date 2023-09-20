import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../table-products/services/admin-products.service';
import { Product } from '../table-products/model/product.model';

@Component({
  templateUrl: 'homeAdmin.component.html',
  styleUrls: ['homeAdmin.component.css']
})
export class HomeAdminComponent implements OnInit{
  productos:Product[]=[]
  constructor(
    private productServices:AdminProductsService
  ) { }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.productos=this.productServices.getProducts();
  }
}
