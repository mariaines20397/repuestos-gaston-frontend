import { Component, OnInit } from '@angular/core';
import { Category } from './model/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminCategoriesService } from './services/admin-categories.service';
import { Router } from '@angular/router';
import { Search } from 'src/app/shared/navbar/model/search.model';
import { Store } from '@ngrx/store';
import * as SearchActions from '../../../shared/navbar/store/search.actions'

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.css']
})
export class TableCategoriesComponent implements OnInit{
  page = 1;
  categories:Category[]=[];
  searchForm:FormGroup;
  
  constructor(
    private categoriesServices:AdminCategoriesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
   }

   ngOnInit(): void {
    this.getCategories()
    // this.store.dispatch(ProductosAdminActions.loadProducts());
  }
  getCategories(){
    this.categories=this.categoriesServices.getCategories();    
  }
  agregar(){
    this.router.navigate(['admin/dashboard/categorias/agregarCategoria']);
    }
    editarCategoria(id:number){
    this.router.navigate([`admin/dashboard/categorias/editarCategoria/${id}`]);
    }
    eliminar(id:number){
      // this.store.dispatch(ProductosAdminActions.deleteProduct(id));
   }
   search(){
    const filtrar = this.searchForm.value.search;
    // this.router.navigate(['/search'],{
    //   queryParams:{filtrar}
    // })    
    this.store.dispatch(SearchActions.loadSearch({filter:filtrar}));
  }
  mostrarData(categoria:any){
    this.categoriesServices.disparadorCategoria.emit(categoria);
  }
}
