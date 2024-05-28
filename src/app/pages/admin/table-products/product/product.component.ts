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
  public productForm: FormGroup;
  public category: any = {};
  public product: any = {};
  private subscriptions = new Subscription();
  private productId!: number;
  private idCategory!: number;
  private arrayBytes = '';

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    private routeActive: ActivatedRoute,
    private store:Store<{ productAdmin:any, category: getAllCategory}>
  ) {
    this.productForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      category: this.formBuilder.group({ 
        category_id: new FormControl(null), 
        name: new FormControl(null) 
      }),
      description: new FormControl(null, [Validators.required]),
      bar_code: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
    this.subscriptions.add(
      this.store
      .select('category')
      .subscribe((category) => this.category = category)
    );
    this.store
          .select(state => state.productAdmin)
          .subscribe((productAdmin) => {
            this.product = productAdmin;
            this.idCategory = this.getCategoryId(this.product);
            this.getByProduct(this.product);
          })
    this.store.dispatch(CategoriasActions.loadCategories());
  }

  ngOnInit(): void { 
   this.productId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
   if (this.productId) {
     this.store.dispatch(ProductosAdminActions.loadProductById({id:this.productId}));
   }
  }

  getByProduct(product:any){
    this.productForm.patchValue({
      name: product.data?.name,
      category: { category_id: this.getCategoryId(product), name: product.data?.category },
      description: product.data?.description,
      price: product.data?.price,
      bar_code: product.data?.bar_code,
      stock: product.data?.stock,
      image: this.mostrarImg(product.data?.image)
    })
  }

  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }

  getCategoryId(product:any) : number{
    let id = 0;
    this.category.data?.forEach((data:any)=>{
      if (product.data?.category == data.name) {
        id = data.category_id;
      }
    })
    return id;
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
      this.product.image = this.arrayBytes;
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
public eliminar() : void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${this.product.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Producto eliminado con éxito!', '', 'success')
      } else if (result.dismiss) {
        Swal.fire('El producto no se eliminó', '', 'info')
      }
    })
  }

 public editar(): void {
    this.router.navigate([`/admin/dashboard/product/edit/${this.productId}`]);
  }
 
 public back() : void{
    this.router.navigate(['/admin/dashboard/product'])
  }
  public guardarProducto(): void {
    const productEdit:any = {}
    const {
      name,
      description,
      category,
      bar_code,
      price,
      stock
    } = this.productForm.value
    const product: any = {
      name,
      description,
      id_category:parseInt(category.category_id),
      price,
      stock,
      image:this.product.image,
      bar_code
    }
if (this.router.url.includes('edit')) {
 productEdit.bar_code = product.bar_code == this.product.data.bar_code ? null : product.bar_code;
 productEdit.description = product.description == this.product.data.description ? null : product.description;
 productEdit.id_category = product.id_category == this.getCategoryId(this.product) ? null : product.id_category;
 productEdit.image = product.image == this.product.data.image ? null : product.image;
 productEdit.name = product.name == this.product.data.name ? null : product.name;
 productEdit.price = product.price == this.product.data.price ? null : product.price;
 productEdit.stock = product.stock == this.product.data.stock ? null : product.stock;
}

    this.router.url.includes('add') ?
    this.store.dispatch(ProductosAdminActions.createProduct({product}))
    : this.store.dispatch(ProductosAdminActions.editProduct({id:this.product.data.product_id!,product:productEdit}));
  }

}
