import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AdminProductsService } from '../services/admin-products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  producto: Product = {};
  productos: Product[] = [];
  nombreProducto: string = '';
  productoId!: number;
  url: string = '';
  editarProducto: boolean = false;
  agregarProducto: boolean = false;
  arrayBytes = '';
  categoriesIds: any[] = [{
    id: 1,
    name: 'Lubricante'
  },
  {
    id: 2,
    name: 'Accesorio',
  },
  {
    id: 3,
    name: 'Repuestos'
  }]
  @Input() mostrarProducto: Product = {};
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private productServices: AdminProductsService,
    private routeActive: ActivatedRoute,
  ) {
    this.productForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      category: this.formBuilder.group({ 
        id: new FormControl(null), 
        name: new FormControl(null) 
      }),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required])
    });
  }
  ngOnInit(): void {
    this.productServices.disparadorProducto.subscribe(data => {
      this.agregarProducto = false;
      this.editarProducto = false;
      this.producto = data;
      this.productForm.patchValue({
        name: data.name,
        category: { id: data.category.id },
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl
      })
    })
  }
  cancelar() {
    this.agregarProducto = false;
    this.editarProducto = false;
    this.producto = {}
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
      this.producto.imageUrl = this.arrayBytes;
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
      title: `¿Estas seguro que quieres eliminar el producto ${this.producto.name}?`,
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
    this.agregarProducto = true;
    this.editarProducto = false;
    this.producto = {}
    this.productForm.reset();
  }
  guardarProducto() {
    const {
      name,
      description,
      price,
      stock
    } = this.productForm.value
    const product = {
      name,
      description,
      price,
      stock,
      imageUrl:this.arrayBytes
    }
    console.log(product);
    // this.editarProducto ?
    // this.store.dispatch(ProductosAdminActions.editProduct({id:this.producto.id,product}))
    // : this.store.dispatch(ProductosAdminActions.createProduct(product));
  }

}
