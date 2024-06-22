import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as SearchActions from 'src/app/shared/navbar/store/search.actions'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private subscriptions = new Subscription();
  public categoryId!: number;
  public category: any = {};
  public nameSearch!: string;
  public products: any = [];
  public listCategories: any = [];
  public search: any = {};
  public nameCategory: string = '';

  constructor(
    private store: Store<{ product: any, category: any, search: any }>,
    private routeActive: ActivatedRoute,
    private route: Router,
    private sanitizer: DomSanitizer
  ) {
    this.subscriptions.add(
      this.store
        .select('product')
        .subscribe((product) => {
          this.products = product;
        })
    );
    this.subscriptions.add(
      this.store
        .select('category')
        .subscribe((category) => {
          this.category = category.productsByCategory;
          this.listCategories = category.data;
          this.productsByCategory();
        })
    );
    this.subscriptions.add(
      this.store
        .select('search')
        .subscribe((search) => {
          this.search = search;
        })
    );
  }
  ngOnInit(): void {
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.nameSearch = this.routeActive.snapshot.paramMap.get('filtrar')!;
    if (this.categoryId) {
      this.store.dispatch(ProductsActions.loadProductsByCategory({ id: this.categoryId, pageable: this.products.pageable }));
    }
    if (this.nameSearch) {
      this.store.dispatch(SearchActions.loadSearch({ filter: this.nameSearch, pageable: this.search.pageable }));
    }
  }

  private productsByCategory(): void {
    this.category?.forEach((data: any) => {
      this.listCategories.forEach((category: any) => {
        if (data.category == category.name) {
          this.nameCategory = category.name;
        }
      })
    })
  }

  public productById(id: number): void {
    this.route.navigate([`/products/${id}`]);
    this.store.dispatch(ProductsActions.loadProductById({ id }));
  }

  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  public pageChange(event: any): void {
    if (!Number.isNaN(event)) {
      this.products.pageable = {
        size: 2,
        page: event != 0 ? event - 1 : 0
      };
    }
    if (this.categoryId) {
      this.store.dispatch(ProductsActions.loadProductsByCategory({ id: this.categoryId, pageable: this.category.pageable }));
    }
    if (this.nameSearch) {
      this.store.dispatch(SearchActions.loadSearch({ filter: this.nameSearch, pageable: this.search.pageable }));
    }
  }
}
