import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../products/model/product.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CarritoActions from './store/carrito.actions';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  restaDisabled:boolean=false;
  sumaDisabled:boolean=false;
  private subscriptions = new Subscription();
  carrito:any = []
  total_price:any
  amount!:number
  carritoForm:FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private store:Store<{ carrito:any}>,
  private sanitizer: DomSanitizer
){
  this.subscriptions.add(
    this.store
    .select('carrito')
    .subscribe((carrito) => {
      this.carrito = carrito.data;
      this.total_price = carrito.total_price;
      this.inicializarProductos(carrito.data);
    })
  )
  this.carritoForm = this.formBuilder.group({
    cantidad: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.min(1)])
  },
  {
    validators: [this.maxValueValidator.bind(this)],
  });
  
}
  ngOnInit(): void {
    this.store.dispatch(CarritoActions.loadCartById());

  }
  get productos(): FormArray {
    return this.carritoForm.get('productos') as FormArray;
  }
  inicializarProductos(carrito:any) {
    carrito.forEach((data:any)=>{
      this.carritoForm.patchValue({
        cantidad:data.amount
      })
    })
  }
  // maxValueValidator(control: AbstractControl): ValidationErrors | null  {
  //   const product = this.carrito;
  //     if (control.get('cantidad')?.value > product.stock!) {
  //       control.get('cantidad')?.setErrors({ maxValueExceeded: true });      
  //       return {
  //         maxValueExceeded: true 
  //       };
  //     }else if(control.get('cantidad')?.value == 0){
  //       control.get('cantidad')?.setErrors({ minValueExceeded: true });      
  //       return {
  //         minValueExceeded: true 
  //       };
  //     }
  //   return null; 
  // }

  maxValueValidator(control: AbstractControl): ValidationErrors | null  {
    this.carrito?.forEach((product:any)=>{
      if (control.get('cantidad')?.value > product.stock) {
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
    })
    return null; 
  }
  resta(id:number){
    const productAdd = {
      amount:1,
      idProduct: id
    }
    this.store.dispatch(CarritoActions.decreaseProduct({product:productAdd}));
  }

  suma(id:number){
    const productAdd = {
      amount:1,
      idProduct: id
    }
    this.store.dispatch(CarritoActions.addProduct({product:productAdd}));
    
  }

  clean(){
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar todos los productos del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CarritoActions.cleanCart());
      } 
    })
  }
  deleteProduct(product:any){
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${product.name} del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CarritoActions.removeProduct({id:product.product_id}));
      } 
    })
  }
  mostrarImg(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
}
