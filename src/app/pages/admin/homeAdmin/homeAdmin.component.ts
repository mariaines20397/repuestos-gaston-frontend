import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../table-products/services/admin-products.service';
import { Product } from '../table-products/model/product.model';
import { User } from '../table-users/model/users.model';
import { AdminUsersService } from '../table-users/services/admin-users.service';

@Component({
  templateUrl: 'homeAdmin.component.html',
  styleUrls: ['homeAdmin.component.css']
})
export class HomeAdminComponent implements OnInit{
  productos:Product[]=[]
  users:User[]=[]
  constructor(
    private productServices:AdminProductsService,
    private userServices:AdminUsersService
  ) { }
  ngOnInit(): void {
    this.getProducts()
    this.getUsers()
  }
  getProducts(){
    this.productos=this.productServices.getProducts();
  }

  getUsers(){
    this.users=this.userServices.getUsers();
  }
}
