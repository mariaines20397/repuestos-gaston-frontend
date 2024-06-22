import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as SalesActions from './store/sale.actions';
import * as SearchSaleActions from './store/searchSale.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-sales',
  templateUrl: './table-sales.component.html',
  styleUrls: ['./table-sales.component.css']
})
export class TableSalesComponent {
  private subscriptions = new Subscription();
  public searchForm: FormGroup;
  public salesAdmin: any[] = [];
  public salesAdminPagination: any = {};
  public salesAdminComplete: any = {};
  private isSearching: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<{ searchSale: any, salesAdmin: any }>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
        .select('salesAdmin')
        .subscribe((salesAdmin) => {
          if (!this.isSearching) {
            this.salesAdminComplete = salesAdmin;
            this.salesAdmin = salesAdmin.data;
            this.salesAdminPagination = salesAdmin.pageable;
            if (salesAdmin.search) {
              this.salesAdmin = salesAdmin.search
            }
          }
        })
    );
    this.store
      .select('searchSale')
      .subscribe((searchSale) => {
        if (this.isSearching) {
          this.salesAdminComplete = searchSale;
          this.salesAdmin = searchSale.search;
          this.salesAdminPagination = searchSale.pageable;
        }
      })
    this.salesAdminPagination = {
      size: 2,
      page: 0
    };
    this.store.dispatch(SalesActions.loadSales({ pageable: this.salesAdminPagination }));
  }

  public search(): void {
    const filter = this.searchForm.value.search;
    this.salesAdminPagination = {
      size: 2,
      page: 0
    };

    if (filter != "") {
      this.isSearching = true;
      this.store.dispatch(SearchSaleActions.loadSaleOrderByNumberSale({ numberSale: parseInt(filter), pageable: this.salesAdminPagination }));
    } else {
      this.isSearching = false;
      this.store.dispatch(SalesActions.loadSales({ pageable: this.salesAdminPagination }));
    }
  }
  public addSale(): void {
    this.router.navigate(['admin/dashboard/sale/add']);
  }
  public viewSale(numberSale: number): void {
    this.store.dispatch(SalesActions.loadSaleById({ id: numberSale }));
    this.router.navigate([`/admin/dashboard/sale/view/${numberSale}`]);
  }
  public editSale(numberSale: number): void {
    this.store.dispatch(SalesActions.loadSaleById({ id: numberSale }));
    this.router.navigate([`/admin/dashboard/sale/edit/${numberSale}`]);
  }
  public pageChange(event: any): void {
    if (!Number.isNaN(event)) {
      this.salesAdminPagination = {
        size: 2,
        page: event != 0 ? event - 1 : 0
      };
    }
    this.store.dispatch(SalesActions.loadSales({ pageable: this.salesAdminPagination }));
  }
}
