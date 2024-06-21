import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions';
import * as SalesActions from './store/sale.actions';
import * as SearchSaleActions from './store/searchSale.actions';
import { Sale, getAllSale } from './model/sale.model';
import { SaleService } from './services/sale.service';
import { Subscription } from 'rxjs';



export type SortColumn = keyof Sale | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: any, v2: any) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);
export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})

export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}
@Component({
  selector: 'app-table-sales',
  templateUrl: './table-sales.component.html',
  styleUrls: ['./table-sales.component.css']
})
export class TableSalesComponent implements OnInit{
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;
  private subscriptions = new Subscription();
  searchForm:FormGroup;
  sales:Sale[]=[];
  salesAdmin:any[]=[]
  salesAdminPagination:any={}
  salesAdminComplete:any={}
  page = 1;
  private isSearching: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private saleServices: SaleService,
    private store:Store<{ searchSale:any, salesAdmin:any}>,
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
      }})
    this.salesAdminPagination = {
      size:2,
      page:0
    };
    this.store.dispatch(SalesActions.loadSales({pageable:this.salesAdminPagination}));
   }
   ngOnInit(): void {    
  }
   search(){
    const filtrar = this.searchForm.value.search;
    this.salesAdminPagination = {
      size:2,
      page:0
    };
    console.log(filtrar);
    
    if (filtrar != "") {
      this.isSearching = true;
      this.store.dispatch(SearchSaleActions.loadSaleOrderByNumberSale({numberSale:parseInt(filtrar),pageable:this.salesAdminPagination}));
    }else{
      this.isSearching = false;
      this.store.dispatch(SalesActions.loadSales({pageable:this.salesAdminPagination}));
    }
  }
  agregar(){
    this.router.navigate(['admin/dashboard/sale/add']);
    }
  verDetalle(id:number){
    this.router.navigate([`admin/dashboard/ventas/ver/${id}`]);
  }
  editarEstadoVenta(id:number){
    this.router.navigate([`admin/dashboard/ventas/editarVenta/${id}`]);
  }
  mostrarData(sale:any){
    this.saleServices.disparadorVenta.emit(sale.id);
  }
  viewSale(numberSale:number){
    this.store.dispatch(SalesActions.loadSaleById({id:numberSale}));
    this.router.navigate([`/admin/dashboard/sale/view/${numberSale}`]);
  }
  editSale(numberSale:number){
    this.store.dispatch(SalesActions.loadSaleById({id:numberSale}));
    this.router.navigate([`/admin/dashboard/sale/edit/${numberSale}`]);
  }
  pageChange(evento:any){
    if (!Number.isNaN(evento)) {
     this.salesAdminPagination = {
        size:2,
       page: evento != 0 ? evento - 1 : 0 
      };
    }
this.store.dispatch(SalesActions.loadSales({pageable:this.salesAdminPagination}));
  }
}
