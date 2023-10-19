import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Search } from 'src/app/shared/navbar/model/search.model';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import { Sale } from './model/sale.model';
import { SaleService } from './services/sale.service';

@Component({
  selector: 'app-table-sales',
  templateUrl: './table-sales.component.html',
  styleUrls: ['./table-sales.component.css']
})
export class TableSalesComponent implements OnInit{
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
    this.router.navigate(['/search'],{
      queryParams:{filtrar}
    })    
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }

  getSales(){
    this.sales=this.saleServices.getSalesPrueba();    
  }
  editarEstadoVenta(id:number){

  }
  verDetalle(id:number){
    
  }

}
