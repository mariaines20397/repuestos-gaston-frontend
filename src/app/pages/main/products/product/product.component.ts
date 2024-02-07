import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  cantidadForm:FormGroup;
  productId!:number;
  stock:number = 8;
  title:string = 'Motul 5100';
  price:number = parseInt('1.000');
  constructor(
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store:Store<{ product:Product}>
  ){
    this.cantidadForm = this.formBuilder.group({
      cantidad: new FormControl(1, [
        Validators.required, 
        Validators.minLength(1)
        // this.maxValueValidator.bind(this)
      ]
      ),
    },
    {
      validators: [this.maxValueValidator.bind(this)],
    });
  }
  ngOnInit(): void {
    this.productId = parseInt(this.routeActive.snapshot.paramMap.get('id')!)
    this.store.dispatch(ProductActions.loadProductById({id:this.productId}))
  }
  comprarAhora(){
    this.authService.autenticado() ?
    this.router.navigate(['/carrito']):
    this.router.navigate(['/login']);
  }
  agregarCarrito(){
    this.authService.autenticado() ?
    (console.log(this.cantidadForm.get('cantidad')!.value),
      this.router.navigate(['/carrito'])):
    this.router.navigate(['/login']);
  }
  maxValueValidator(control: AbstractControl): ValidationErrors | null  {
    if (control.get('cantidad')?.value > this.stock) {
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
}
