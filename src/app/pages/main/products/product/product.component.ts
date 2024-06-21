import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  cantidadForm:FormGroup;
  private subscriptions = new Subscription();
  productId!:number;
  product:any={}
  productPayment:any[]=[];
  isAuthenticated:any
  constructor(
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public productsService: ProductsService,
    private sanitizer: DomSanitizer,
    private store:Store<{ product:any, productAdmin:any, carrito:any}>
  ){
    this.cantidadForm = this.formBuilder.group({
      cantidad: new FormControl(1, [
        Validators.required, 
        Validators.minLength(1)
      ]
      ),
    },
    {
      validators: [this.maxValueValidator.bind(this)],
    });
    this.store
    .select(state => state.productAdmin)
    .subscribe((productAdmin) => {
      this.product = productAdmin;
    })
    this.subscriptions.add(
    this.store
    .select('product')
    .subscribe((product) => {
      this.product = product.data;
    })
  )
  }
  ngOnInit(): void {
    this.productId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.store.dispatch(ProductActions.loadProductById({id:this.productId}));
    
  }
  async comprarAhora(product:any){
    if (this.authService.autenticado()) {
      const amount = this.cantidadForm.get('cantidad')!.value;
      const productAdd = {
        price: product.price_id_stripe,
      quantity: amount
      }
      const productAddCart = {
        amount,
        idProduct: product.product_id
      }
      this.productPayment.push(productAdd);
      this.store.dispatch(ProductActions.addProductToCart({product:productAddCart}));
      await this.productsService.payment(this.productPayment);
    }else{
      Swal.fire('Inicia sesión', `Para agregar un producto al carrito haz click en continuar e inicia sesión.`, 'info')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            } 
          })
    }
  }
  agregarCarrito(product:any){
    
    if (this.authService.autenticado()) {
      const amount = this.cantidadForm.get('cantidad')!.value;
      const productAdd = {
        amount,
        idProduct: product.product_id
      }
      this.store.dispatch(ProductActions.addProductToCart({product:productAdd}));
      this.router.navigate(['/carrito']);
    }else{
      Swal.fire('Inicia sesión', `Para agregar un producto al carrito haz click en continuar e inicia sesión.`, 'info')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            } 
          })
    }
  }
  maxValueValidator(control: AbstractControl): ValidationErrors | null  {
    if (control.get('cantidad')?.value > this.product.stock) {
      control.get('cantidad')?.setErrors({ maxValueExceeded: true });      
      return {
        maxValueExceeded: true 
      };
    }else if(control.get('cantidad')?.value == 0){
      control.get('cantidad')?.setErrors({ minValueExceeded: true });      
      return {
        minValueExceeded: true 
      };
    }

    return null; 
  }
  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
}
