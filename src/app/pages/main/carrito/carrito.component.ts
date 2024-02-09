import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Product } from '../products/model/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  restaDisabled:boolean=false;
  sumaDisabled:boolean=false;
  listProducts:Product[]=[
    {
      id:1,
      name:'Motul 5100',
      price:1000,
      description:'Aceite de motos sintético',
      img:'./assets/img/productos/motul.png',
      stock:20
    },
    {
      id:2,
      name:'Motul 5100',
      price:1000,
      description:'Aceite de motos sintético',
      img:'./assets/img/productos/motul.png',
      stock:20
    }
  ]
  carritoForm:FormGroup;
constructor(
  private formBuilder: FormBuilder,
){
  this.carritoForm = this.formBuilder.group({
    cantidad: new FormControl(1, [Validators.required, Validators.minLength(1)]),
    subtotal: new FormControl(1000),
    total: new FormControl(1000),
  },
  {
    validators: [this.maxValueValidator.bind(this)],
  });
}
  ngOnInit(): void {
    this.listProducts.forEach(data=>{
      this.subTotal(data.price!);
    })
    this.total();
  }
  maxValueValidator(control: AbstractControl): ValidationErrors | null  {
    const product = this.listProducts[0];
      if (this.listProducts.length > 0 && control.get('cantidad')?.value > product.stock!) {
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
  resta(){
    if (this.carritoForm.get('cantidad')!.value != 1) {
      this.restaDisabled = false;
      const resultadoResta = this.carritoForm.get('cantidad')!.value - 1;
      this.sumaDisabled = false;
      this.listProducts.forEach(data=>{
        this.carritoForm.get('cantidad')!.setValue(resultadoResta);
        this.subTotal(data.price!);
      })
    }
    this.total();
  }

  suma(){
    this.listProducts.forEach(data=>{
    if (this.carritoForm.get('cantidad')!.value != data.stock) {
      this.sumaDisabled = false;
      const resultadoSuma = this.carritoForm.get('cantidad')!.value + 1;
        this.carritoForm.get('cantidad')!.setValue(resultadoSuma);
        this.subTotal(data.price!);
      
    }
  })
  this.total();
  }

  subTotal(precio:number){
    const resultadoSubTotal = this.carritoForm.get('cantidad')!.value * precio
    this.carritoForm.get('subtotal')!.setValue(resultadoSubTotal);
  }

  total(){
    let acu = 0;
    acu += this.carritoForm.get('subtotal')!.value;
    this.carritoForm.get('total')!.setValue(acu);
  }
  clean(){
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar todos los productos del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listProducts=[]
        Swal.fire('¡Tu carrito ahora esta limpio!', '', 'success')
      } 
    })
  }
  deleteProduct(productSelected:any){
    const index = this.listProducts.indexOf(productSelected);
    if (index > -1) {
      this.listProducts.splice(index, 1)
    }
  }
}
