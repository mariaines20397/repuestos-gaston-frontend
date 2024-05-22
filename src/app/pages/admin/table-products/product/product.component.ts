import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AdminProductsService } from '../services/admin-products.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as ProductosAdminActions from '../store/products.actions';
import * as CategoriasActions from 'src/app/shared/navbar/store/categories.actions';
import { AdminCategoriesService } from '../../table-categories/services/admin-categories.service';
import { getAllCategories, getAllCategory } from '../../table-categories/model/category.model';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  category: any = {};
  private subscriptions = new Subscription();
  product: any = {};
  productos: Product[] = [];
  nombreProducto: string = '';
  productoId!: number;
  idCategory!: number;
  url: string = '';
  editarProducto: boolean = false;
  agregarProducto: boolean = false;
  viewProduct: boolean = false;
  arrayBytes = '';
  @Input() mostrarProducto: Product = {};
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private productServices: AdminProductsService,
    private sanitizer: DomSanitizer,
    private adminCategoryServices: AdminCategoriesService,
    private routeActive: ActivatedRoute,
    private store:Store<{ productAdmin:Product, category: getAllCategory}>
  ) {
    this.productForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      category: this.formBuilder.group({ 
        category_id: new FormControl(null), 
        name: new FormControl(null) 
      }),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required])
    });
    this.subscriptions.add(
      this.store
      .select('category')
      .subscribe((category) => this.category = category)
    );
    // this.subscriptions.add(
    //   this.store
    //   .select('productAdmin')
    //   .subscribe((productAdmin) => {
    //     this.product = productAdmin;
    //     this.idCategory = this.getCategoryId(this.product.data[0]);
    //     console.log(this.product[0]);
    //     console.log(this.product.data[0]);
    //   })
    // );
    this.store.dispatch(CategoriasActions.loadCategories());
  }
  ngOnInit(): void {
    this.productServices.disparadorProducto.subscribe(data => {
      this.agregarProducto = false;
      this.editarProducto = false;
      // this.store.dispatch(ProductosAdminActions.loadProductById(data.product_id));
      console.log(this.product);
      data == true ? this.viewProduct = true : this.viewProduct = false;
      if (this.viewProduct) {
        this.subscriptions.add(
          this.store
          .select('productAdmin')
          .subscribe((productAdmin) => {
            this.product = productAdmin;
            this.idCategory = this.getCategoryId(this.product.data[0]);
            console.log(this.product[0]);
            console.log(this.product.data[0]);
          })
        );
      }
      // // this.producto = data;
      this.productForm.patchValue({
        name: this.product.data[0].name,
        category: { category_id: this.idCategory },
        description: this.product.data[0].description,
        price: this.product.data[0].price,
        stock: this.product.data[0].stock,
        image: this.product.data[0].image
      })
      console.log(this.productForm.value);
      console.log(this.idCategory);
      
    })

  }
  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  getCategoryId(product:any) : number{
    let id = 0;
    this.category.data.forEach((data:any)=>{
      if (product.category == data.name) {
        id= data.category_id;
      }
    })
    return id;
  }
  cancelar() {
    this.agregarProducto = false;
    this.editarProducto = false;
    this.product = {}
    this.productForm.reset();
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    this.arrayBytes = await this.leerArchivoComoBase64(file);
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        this.productForm.get('imagen')!.setErrors({ fileType: true });
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      this.product.imageUrl = this.arrayBytes;
    }
}

private async leerArchivoComoBase64(archivo: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]); // Extraer el base64 de la cadena de datos
            } else {
                reject(new Error('Error al leer el archivo'));
            }
        };
        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };
        reader.readAsDataURL(archivo);
    });
}
  getProducts() {
    this.productos = this.productServices.getProducts();
  }
  eliminar() {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${this.product.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Producto eliminado con éxito!', '', 'success')
        // this.productServices.deleteProductAdmin(this.producto.id!);
      } else if (result.dismiss) {
        Swal.fire('El producto no se eliminó', '', 'info')
      }
    })
  }

  editar() {
    this.editarProducto = true;
    this.agregarProducto = false;
  }
  agregar() {
    console.log(this.category);
    this.agregarProducto = true;
    this.editarProducto = false;
    this.product = {}
    this.productForm.reset();
  }
  guardarProducto() {
    const {
      name,
      description,
      category,
      price,
      stock
    } = this.productForm.value
    const product: any = {
      name,
      description,
      id_category:parseInt(category.category_id),
      price,
      stock,
      image:this.arrayBytes,
      bar_code:123
    }
    console.log(product);
    // console.log(categoriesIds);
    this.editarProducto ?
    this.store.dispatch(ProductosAdminActions.editProduct({id:this.product.id!,product}))
    : this.store.dispatch(ProductosAdminActions.createProduct({product}));
  }

}
