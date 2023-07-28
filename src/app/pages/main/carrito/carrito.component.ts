import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  restaDisabled:boolean=false;
  sumaDisabled:boolean=false;
  listProducts:any[]=[
    {
      id:1,
      name:'Motul 5100',
      price:1000,
      descriptions:'Aceite de motos sintético',
      img:'./assets/img/productos/motul.png',
      cantidad: 1,
      stock:20
    }
  ]
  carritoForm:FormGroup;
constructor(
  private formBuilder: FormBuilder,
){
  this.carritoForm = this.formBuilder.group({
    cantidad: new FormControl(5, [Validators.required]),
    subtotal: new FormControl(1000),
    total: new FormControl(1000),
  });
}
  ngOnInit(): void {
    this.listProducts.forEach(data=>{
      this.subTotal(data.price);
    })
    this.total();
  }

  resta(){
    if (this.carritoForm.get('cantidad')!.value == 1) {
      this.restaDisabled = true;
    }else{
      const resultadoResta = this.carritoForm.get('cantidad')!.value - 1;
      this.listProducts.forEach(data=>{
        this.carritoForm.get('cantidad')!.setValue(resultadoResta);
        this.subTotal(data.price);
      })
    }
    this.total();
  }

  suma(){
    this.listProducts.forEach(data=>{
    if (this.carritoForm.get('cantidad')!.value == data.stock) {
      this.sumaDisabled = true;
    }else{
      const resultadoSuma = this.carritoForm.get('cantidad')!.value + 1;
        this.carritoForm.get('cantidad')!.setValue(resultadoSuma);
        this.subTotal(data.price);
      
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

}
