import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CategoriasAdminActions from '../store/categories.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryForm: FormGroup;
  category: any = {};
  categoryId!: number;
  private idCategory!: number;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private routeActive: ActivatedRoute,
    private store:Store<{ categoryAdmin:any }>
  ) {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    });
    this.subscriptions.add(
      this.store
      .select('categoryAdmin')
      .subscribe((category) => this.category = category)
    );
    this.store
          .select(state => state.categoryAdmin)
          .subscribe((categoryAdmin) => {
            this.category = categoryAdmin;
            this.getByCategory(this.category);
          })
  
  }

  ngOnInit(): void {
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    if (this.categoryId) {
      this.store.dispatch(CategoriasAdminActions.loadCategoryById({id:this.categoryId}));
    }
  }
  getByCategory(category:any){
    this.categoryForm.patchValue({
      name: category.data?.name
    })
  }
  public editar(): void {
    this.router.navigate([`/admin/dashboard/category/edit/${this.categoryId}`]);
  }
  public back() : void{
    this.router.navigate(['/admin/dashboard/category'])
  }
  getProductControl(index: number) {
    console.log((this.categoryForm.get('products') as FormArray));
    
    return ((this.categoryForm.get('products') as FormArray).at(index) as FormControl);
  }
  public guardarProducto(): void {
    const {
      name
    } = this.categoryForm.value
    const category: any = {
      name
    }
    this.router.url.includes('add') ?
    this.store.dispatch(CategoriasAdminActions.createCategory({category}))
    : this.store.dispatch(CategoriasAdminActions.editCategory({id:this.category.data.category_id!,category}));
  }
}
