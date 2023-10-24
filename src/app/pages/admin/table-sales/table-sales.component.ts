import { Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import { Sale } from './model/sale.model';
import { SaleService } from './services/sale.service';



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
    console.log(this.sortable);
    
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

  searchForm:FormGroup;
  sales:Sale[]=[];
  page = 1;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private saleServices: SaleService,
    private store:Store<{ filtrar:Search}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
   }
   ngOnInit(): void {
    this.getSales()
    // this.store.dispatch(ProductosAdminActions.loadProducts());
  }
   search(){
    const filtrar = this.searchForm.value.search;
    // this.router.navigate(['/search'],{
    //   queryParams:{filtrar}
    // })    
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }

  getSales(){
    this.sales=this.saleServices.getSalesPrueba();    
  }
  verDetalle(id:number){
    this.router.navigate([`admin/dashboard/ventas/ver/${id}`]);
  }
  editarEstadoVenta(id:number){
    this.router.navigate([`admin/dashboard/ventas/editarVenta/${id}`]);
  }
  
	// onSort(event: { column: SortColumn, direction: SortDirection } | Event) {
  //   console.log(event);
    
	// 	// resetting other headers
	// 	this.headers.forEach((header) => {
	// 		if (header.sortable !== event.column) {
	// 			header.direction = '';
	// 		}
	// 	});

	// 	// sorting countries
	// 	if (event.direction === '' || event.column === '') {
	// 		this.sales = this.saleServices.getSalesPrueba();
	// 	} else {
	// 		this.sales = [...this.saleServices.getSalesPrueba()].sort((a, b) => {
	// 			const res = compare(a[column  as keyof Sale], b[column  as keyof Sale]);
	// 			return direction === 'asc' ? res : -res;
	// 		});
	// 	}
  // }

}
