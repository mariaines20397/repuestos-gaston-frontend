import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AdminProductsService } from '../services/admin-products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  productForm:FormGroup;
  producto:Product={};
  productos:Product[]=[];
  nombreProducto:string='';
  url:string='';
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private productServices:AdminProductsService,
    private routeActive: ActivatedRoute,
   ){
     this.productForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required])
     });
   }
ngOnInit(): void {
  this.editarProducto();
}
   cancelar(){
    this.router.navigate(['/admin/productos'])
   }
   agregarProducto(){

   }

   onFileSelected(event: any): void {
    const file = event.target.files[0];
  
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        this.productForm.get('imagen')!.setErrors({ fileType: true });
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      this.producto.imageUrl = imageUrl;
    }
  }
  getProducts(){
    this.productos=this.productServices.getProducts();
  }
  editarProducto(){
    if (this.router.url.includes('editarProducto')) {
      this.getProducts();
      const productoId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
      this.productos.forEach(producto=>{
        if (producto.id == productoId) {
          const {
            name,
            description,
            price,
            stock,
            imageUrl
          } = producto
          this.nombreProducto=name!;
          this.url=imageUrl!;
          this.productForm.patchValue({
            name,
            description,
            price,
            stock,
            imageUrl
          })
        }
      })
      
    }
  }
}
