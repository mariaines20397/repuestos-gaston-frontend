import { Component, OnInit } from '@angular/core';
import { getAllProduct } from './model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductosAdminActions from './store/products.actions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {
  public searchForm: FormGroup;
  public productAdmin: any = {}
  private subscriptions = new Subscription();
  private isLowStock: string = '';
  private isSearching: boolean = false;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private routeActive: ActivatedRoute,
    private store: Store<{ search: Search, productAdmin: getAllProduct }>,
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
          }
        })
    );
    this.subscriptions.add(
      this.store
        .select('search')
        .subscribe((search) => {
          if (this.isSearching) {
            this.productAdmin = search;
          }
        })
    );
  }
  ngOnInit(): void {
    this.isLowStock = this.routeActive.snapshot.paramMap.get('lowStock')!;
    this.productAdmin.pageable = {
      size: 4,
      page: 0
    };
    if (this.isLowStock) {
      this.store.dispatch(ProductosAdminActions.loadProductByLowStock({ pageable: this.productAdmin.pageable }));
    } else {
      this.store.dispatch(ProductosAdminActions.loadProducts({ pageable: this.productAdmin.pageable }));
    }
  }
  public addProduct(): void {
    this.router.navigate(['admin/dashboard/product/add']);
  }
  public editProduct(id: number): void {
    this.router.navigate([`admin/dashboard/product/edit/${id}`]);
    this.store.dispatch(ProductosAdminActions.loadProductById({ id }));
  }
  public viewProduct(id: number): void {
    this.router.navigate([`admin/dashboard/product/view/${id}`]);
    this.store.dispatch(ProductosAdminActions.loadProductById({ id }));
  }
  public pageChange(event: any): void {
    if (!Number.isNaN(event)) {
      this.productAdmin.pageable = {
        size: 4,
        page: event != 0 ? event - 1 : 0
      };
    }
    this.store.dispatch(ProductosAdminActions.loadProducts({ pageable: this.productAdmin.pageable }));
  }
  public deleteProduct(product: any): void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${product.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(ProductosAdminActions.deleteProduct({ id: product.product_id }));
      }
    })

  }
  public search(): void {
    const filter = this.searchForm.value.search;
    this.productAdmin.pageable = {
      size: 4,
      page: 0
    };
    if (filter == "") {
      this.isSearching = false;
      this.store.dispatch(ProductosAdminActions.loadProducts({ pageable: this.productAdmin.pageable }));
    } else {
      this.isSearching = true;
      this.store.dispatch(SearchActions.loadSearch({ filter: filter, pageable: this.productAdmin.pageable }));
    }
  }

  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }

}
