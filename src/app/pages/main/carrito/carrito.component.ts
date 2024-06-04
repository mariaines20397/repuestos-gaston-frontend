import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
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
  // listProducts:Product[]=[
  //   {
  //     id:1,
  //     name:'Motul 5100',
  //     price:1000,
  //     description:'Aceite de motos sintético',
  //     img:'./assets/img/productos/motul.png',
  //     stock:20
  //   },
  //   {
  //     id:2,
  //     name:'Motul 5100',
  //     price:1000,
  //     description:'Aceite de motos sintético',
  //     img:'./assets/img/productos/motul.png',
  //     stock:20
  //   }
  // ]
  carritoForm:FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private store:Store<{ carrito:any}>,
  private sanitizer: DomSanitizer
){
  this.carritoForm = this.formBuilder.group({
    cantidad: new FormControl(1, [Validators.required, Validators.minLength(1)])
  },
  {
    validators: [this.maxValueValidator.bind(this)],
  });
  this.subscriptions.add(
    this.store
    .select('carrito')
    .subscribe((carrito) => {
      this.carrito = carrito.data;
      this.total_price = carrito.total_price;
      console.log(this.carrito);
      console.log(this.total_price);
      
    })
  )
}
  ngOnInit(): void {
    this.store.dispatch(CarritoActions.loadCartById());

    // this.listProducts.forEach(data=>{
    //   this.subTotal(data.price!);
    // })
    // this.total();
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
    // if (this.carritoForm.get('cantidad')!.value != 1) {
    //   this.restaDisabled = false;
    //   const resultadoResta = this.carritoForm.get('cantidad')!.value - 1;
    //   this.sumaDisabled = false;
    //   this.listProducts.forEach(data=>{
    //     this.carritoForm.get('cantidad')!.setValue(resultadoResta);
    //     this.subTotal(data.price!);
    //   })
    // }
    // this.total();
  }

  suma(id:number){
    const productAdd = {
      amount:1,
      idProduct: id
    }
    this.store.dispatch(CarritoActions.addProduct({product:productAdd}));
  }

  // subTotal(precio:number){
  //   const resultadoSubTotal = this.carritoForm.get('cantidad')!.value * precio
  //   this.carritoForm.get('subtotal')!.setValue(resultadoSubTotal);
  // }

  // total(){
  //   let acu = 0;
  //   acu += this.carritoForm.get('subtotal')!.value;
  //   this.carritoForm.get('total')!.setValue(acu);
  // }
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
