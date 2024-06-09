import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from '../table-products/services/admin-products.service';
import { Product, getAllProduct } from '../table-products/model/product.model';
import { User, getAllUser } from '../table-users/model/users.model';
import { AdminUsersService } from '../table-users/services/admin-users.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as UserAdminActions from '../table-users/store/users.actions'
import * as ProductosAdminActions from '../table-products/store/products.actions';

@Component({
  templateUrl: 'homeAdmin.component.html',
  styleUrls: ['homeAdmin.component.css']
})
export class HomeAdminComponent implements OnInit{
  productAdmin:any={}
  userAdmin:any={}
  productsStockLow:any[]=[]
  private subscriptions = new Subscription();
  lowStockParam:string = 'lowStock';

  constructor(
    private store:Store<{ userAdmin:getAllUser, productAdmin: getAllProduct}>,
  ) { 
    this.subscriptions.add(
      this.store
      .select('productAdmin')
      .subscribe((productAdmin) => {
          this.productAdmin = productAdmin;
          this.calculateStockSlow(this.productAdmin)
      })
    );
    this.subscriptions.add(
      this.store
      .select('userAdmin')
      .subscribe((userAdmin) => {
          this.userAdmin = userAdmin;
      })
    );
    
  }
  ngOnInit(): void {
    this.productAdmin.pageable = {
      size:2,
      page:0
    };
    this.userAdmin.pageable = {
      size:2,
      page:0
    };
    this.store.dispatch(UserAdminActions.loadUsers({pageable:undefined}));
    this.store.dispatch(ProductosAdminActions.loadProducts({pageable:undefined}));
  }

  calculateStockSlow(products:any){
    products.data.forEach((data:any) => {
      if (data.stock <= 5) {
        this.productsStockLow.push(data);
      }
    });
  }
  lowStock(){
    this.productAdmin.pageable = {
      size:2,
      page:0
    };
    this.store.dispatch(ProductosAdminActions.loadProductByLowStock({pageable:this.productAdmin.pageable}));
  }
}
