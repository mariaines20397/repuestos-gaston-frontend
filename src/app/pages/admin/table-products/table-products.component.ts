import { Component, OnInit } from '@angular/core';
import { getAllProduct } from './model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  searchForm:FormGroup;
  page = 0;
  productAdmin: any = {}
  imageSource: any = {}
  pagination: any = {}
  private subscriptions = new Subscription();
  isLowStock:string='';
  private isSearching: boolean = false;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private routeActive: ActivatedRoute,
    private store:Store<{ search:Search, productAdmin: getAllProduct }>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
      .select('productAdmin')
      .subscribe((productAdmin) => {
        if (!this.isSearching) {
          this.productAdmin = productAdmin;        
      }})
    );
    this.subscriptions.add(
      this.store
      .select('search')
      .subscribe((search) => {
        if (this.isSearching) {
        this.productAdmin = search;      
      }})
    );    
   }
  ngOnInit(): void {
    this.isLowStock = this.routeActive.snapshot.paramMap.get('lowStock')!;
    this.productAdmin.pageable = {
      size:4,
      page:0
    };
    if (this.isLowStock) {
      this.store.dispatch(ProductosAdminActions.loadProductByLowStock({pageable:this.productAdmin.pageable})); 
    }else{
      this.store.dispatch(ProductosAdminActions.loadProducts({pageable:this.productAdmin.pageable}));
    }
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
  pageChange(evento:any){
    if (!Number.isNaN(evento)) {
     this.productAdmin.pageable = {
        size:4,
       page: evento != 0 ? evento - 1 : 0 
      };
    }
this.store.dispatch(ProductosAdminActions.loadProducts({pageable:this.productAdmin.pageable}));
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
  this.productAdmin.pageable = {
    size:4,
    page:0
  };
  if (filtrar == "") {
    this.isSearching = false;
    this.store.dispatch(ProductosAdminActions.loadProducts({pageable:this.productAdmin.pageable}));
  }else{
    this.isSearching = true;
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar, pageable:this.productAdmin.pageable}));
  }
}
mostrarData(producto:any){
  this.router.navigate([`/admin/dashboard/productos/${producto.product_id}`])
  this.store.dispatch(ProductosAdminActions.loadProductById({id:producto.product_id}));
}

mostrarImg(image:any){
  return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
}

}
