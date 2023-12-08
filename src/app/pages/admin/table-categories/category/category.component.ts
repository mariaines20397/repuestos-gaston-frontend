import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../model/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCategoriesService } from '../services/admin-categories.service';
import Swal from 'sweetalert2';
import { Product } from '../../table-products/model/product.model';
import { AdminProductsService } from '../../table-products/services/admin-products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  selectedProductId: number | null = null;
  categoryForm: FormGroup;
  categoria: Category = {};
  categorias: Category[] = [];
  productos: Product[] = [];
  nombreCategory: string = '';
  categoriaId!: number;
  url: string = '';
  editarCategoria: boolean = false;
  agregarCategoria: boolean = false;
  @Input() mostrarCategoria: Category = {};

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private adminCategoryServices: AdminCategoriesService,
    private adminProductServices: AdminProductsService,
    private routeActive: ActivatedRoute,
  ) {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      products: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.adminCategoryServices.disparadorCategoria.subscribe(data => {
      this.agregarCategoria = false;
      this.editarCategoria = false;
      this.categoria = data;
      console.log(data);
      // const productNames = this.formBuilder.array(data.products.map((product:Product) => product.name));
      // this.categoryForm.addControl('products', productNames);
      // data.products.forEach((product:Product) => {
        const productsArray = this.formBuilder.array([]);
        this.categoryForm.setControl('products', productsArray);
        const productArray = this.formBuilder.array(data.products.map((prueba:any) => prueba.name));
        (this.categoryForm.get('products') as FormArray).push(productArray);

        this.categoryForm.patchValue({
          name: data.name,
        });
      // })
    })
  }
  getProductControl(index: number) {
    console.log((this.categoryForm.get('products') as FormArray));
    
    return ((this.categoryForm.get('products') as FormArray).at(index) as FormControl);
  }
  cancelar() {
    this.agregarCategoria = false;
    this.editarCategoria = false;
    this.categoria = {}
    this.categoryForm.reset();
  }
  getCategories() {
    this.categorias = this.adminCategoryServices.getCategories();
  }

  eliminar() {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar la categoria ${this.categoria.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Categoria eliminada con éxito!', '', 'success')
        // this.productServices.deleteProductAdmin(this.producto.id!);
      } else if (result.dismiss) {
        Swal.fire('La categoria no se eliminó', '', 'info')
      }
    })
  }

  editar() {
    this.editarCategoria = true;
    this.agregarCategoria = false;
    this.productos = this.adminProductServices.getProducts()
    .filter((product)=>!product.category && !this.categoryForm.get('products'));
  }
  agregar() {
    
    this.agregarCategoria = true;
    this.editarCategoria = false;
    this.categoria = {};
    this.categoryForm.reset();
    console.log(this.categoryForm.get('products'));
    
    this.productos = this.adminProductServices.getProducts()
    .filter((product)=>!product.category);
    console.log(this.productos);
    
  }
  agregarProducto(){

  }
  guardarCategoria() {
    const {
      name,
      products
    } = this.categoryForm.value
    const category = {
      name,
      products
    }
    console.log(category);
    // this.editarCategoria ?
    // this.store.dispatch(CategoriasAdminActions.editCategory({id:this.categoria.id,category}))
    // : this.store.dispatch(CategoriasAdminActions.createCategory(category));
  }
  get productsFormArray() {
    return this.categoryForm.get('products') as FormArray;
  }
  public onSelectProduct(event: any): void {
    this.selectedProductId = event?.target?.value;
if (this.selectedProductId) {
  const control = this.formBuilder.control(this.selectedProductId);
  this.productsFormArray.push(control);
  
}
    
    // const checkArray: FormArray = this.categoryForm.get('products') as FormArray;
    // if (state.target.checked) {
    //   // this.formBuilder.array()
    //   console.log(state.target.value);
    //   console.log(checkArray);
      
    //   checkArray.push(state.target.value);
    //   console.log(checkArray);

    // } else {
    //   const valueToRemove = state.target.value;
    //   const indexToRemove = checkArray.controls.findIndex((item) => item.value == valueToRemove);
    //   if (indexToRemove >= 0) {
    //     checkArray.removeAt(indexToRemove);
    //   }
    // }
  }
}
