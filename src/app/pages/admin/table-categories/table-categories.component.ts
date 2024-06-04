import { Component, OnInit } from '@angular/core';
import { Category, getAllCategory } from './model/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Search } from 'src/app/shared/navbar/model/search.model';
import { Store } from '@ngrx/store';
import * as SearchActions from '../../../shared/navbar/store/search.actions'
import * as CategoryActions from './store/categories.actions'
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.css']
})
export class TableCategoriesComponent implements OnInit{
 
  searchForm:FormGroup;
  private subscriptions = new Subscription();
  categoryAdmin: any = {}
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store:Store<{ filtrar:Search, categoryAdmin: getAllCategory}>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
      .select('categoryAdmin')
      .subscribe((categoryAdmin) => {
          this.categoryAdmin = categoryAdmin;
        
      })
    );
    this.categoryAdmin.pageable = {
      size:2,
      page:0
    };
    
    this.store.dispatch(CategoryActions.loadCategories({pageable:this.categoryAdmin.pageable}));
   
   }

   ngOnInit(): void { }
  agregar(){
    this.router.navigate(['admin/dashboard/category/add']);
    }
    editarCategoria(id:number){
    this.router.navigate([`admin/dashboard/category/edit/${id}`]);
    this.store.dispatch(CategoryActions.loadCategoryById({id}));
  }
  verCategoria(id:number){
    this.router.navigate([`admin/dashboard/category/view/${id}`]);
    this.store.dispatch(CategoryActions.loadCategoryById({id}));
  }
  eliminarCategoria(category:any){
      Swal.fire({
        title: `¿Estas seguro que quieres eliminar la categoría ${category.name}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        icon:'question'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(CategoryActions.deleteCategory({id:category.category_id}));
        } 
      })
   }
   search(){
    const filtrar = this.searchForm.value.search;
    this.categoryAdmin.pageable = {
      size:2,
      page:0
    };
    if (filtrar == "") {
      this.store.dispatch(CategoryActions.loadCategories({pageable:this.categoryAdmin.pageable}));
    }else{
      this.store.dispatch(SearchActions.loadSearch({filter:filtrar, pageable:this.categoryAdmin.pageable}));
    }  
  }
  pageChange(evento:any){
    if (!Number.isNaN(evento)) {
     this.categoryAdmin.pageable = {
        size:2,
       page: evento != 0 ? evento - 1 : 0 
      };
    }
this.store.dispatch(CategoryActions.loadCategories({pageable:this.categoryAdmin.pageable}));
  }
}
