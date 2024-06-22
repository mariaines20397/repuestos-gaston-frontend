import { Component } from '@angular/core';
import { getAllCategory } from './model/category.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CategoryActions from './store/categories.actions';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.css']
})
export class TableCategoriesComponent {

  public searchForm: FormGroup;
  private subscriptions = new Subscription();
  public categoryAdmin: any = {};
  private isSearching: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<{ categoriesSearch: any, categoryAdmin: getAllCategory }>,
  ) {
    this.searchForm = this.formBuilder.group({
      search: new FormControl(null)
    });
    this.subscriptions.add(
      this.store
        .select('categoryAdmin')
        .subscribe((categoryAdmin) => {
          if (!this.isSearching) {
            this.categoryAdmin = categoryAdmin;
          }
        })
    );
    this.store
      .select('categoriesSearch')
      .subscribe((categoriesSearch) => {
        if (this.isSearching) {
          this.categoryAdmin = categoriesSearch;
        }
      })
    this.categoryAdmin.pageable = {
      size: 2,
      page: 0
    };

    this.store.dispatch(CategoryActions.loadCategories({ pageable: this.categoryAdmin.pageable }));
  }

  public addCategory(): void {
    this.router.navigate(['admin/dashboard/category/add']);
  }
  public editCategory(id: number): void {
    this.router.navigate([`admin/dashboard/category/edit/${id}`]);
    this.store.dispatch(CategoryActions.loadCategoryById({ id }));
  }
  public viewCategory(id: number): void {
    this.router.navigate([`admin/dashboard/category/view/${id}`]);
    this.store.dispatch(CategoryActions.loadCategoryById({ id }));
  }
  public deleteCategory(category: any): void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar la categoría ${category.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      icon: 'question'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CategoryActions.deleteCategory({ id: category.category_id }));
      }
    })
  }
  search() {
    const filter = this.searchForm.value.search;
    this.categoryAdmin.pageable = {
      size: 2,
      page: 0
    };
    if (filter == "") {
      this.isSearching = false;
      this.store.dispatch(CategoryActions.loadCategories({ pageable: this.categoryAdmin.pageable }));
    } else {
      this.isSearching = true;
      this.store.dispatch(CategoryActions.loadCategoriesByName({ filter: filter, pageable: this.categoryAdmin.pageable }));
    }
  }
  pageChange(event: any) {
    if (!Number.isNaN(event)) {
      this.categoryAdmin.pageable = {
        size: 2,
        page: event != 0 ? event - 1 : 0
      };
    }
    this.store.dispatch(CategoryActions.loadCategories({ pageable: this.categoryAdmin.pageable }));
  }
}
