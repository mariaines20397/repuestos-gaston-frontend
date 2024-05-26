import { Component, OnInit } from '@angular/core';
import { Product, getAllProduct } from './model/product.model';
import { AdminProductsService } from './services/admin-products.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductosAdminActions from './store/products.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit{
  
  page = 1;
  productos:Product[]=[];
  searchForm:FormGroup;
  productAdmin: any = {}
  imageSource: any = {}
  private subscriptions = new Subscription();
  
  constructor(
    private productServices:AdminProductsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private store:Store<{ filtrar:Search, productAdmin: getAllProduct }>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
      .select('productAdmin')
      .subscribe((productAdmin) => {
        this.productAdmin = productAdmin
      console.log(this.productAdmin);
      
      })
    );
    this.store.dispatch(ProductosAdminActions.loadProducts());
   }
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this.productos=this.productServices.getProducts();    
  }
  agregar(){
  this.router.navigate(['admin/dashboard/product/add']);
  }
  editarProducto(id:number){
  this.router.navigate([`admin/dashboard/product/edit/${id}`]);
  this.store.dispatch(ProductosAdminActions.loadProductById({id}));
  }
  verProducto(id:number){
    this.router.navigate([`admin/dashboard/product/view/${id}`]);
    this.store.dispatch(ProductosAdminActions.loadProductById({id}));

  }
  eliminarProducto(product:any){
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${product.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon:'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(ProductosAdminActions.deleteProduct({id:product.product_id}));
      } 
    })
    
 }
 search(){
  const filtrar = this.searchForm.value.search;
  console.log(filtrar);
  
  this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
}
mostrarData(producto:any){
  console.log(producto);
  this.router.navigate([`/admin/dashboard/productos/${producto.product_id}`])
  this.store.dispatch(ProductosAdminActions.loadProductById({id:producto.product_id}));
}

mostrarImg(image:any){
  return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
}

}
