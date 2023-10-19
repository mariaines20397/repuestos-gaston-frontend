import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../model/sale.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit{
  saleForm:FormGroup;
  sale:Sale={};
  sales:Sale[]=[];
  numeroCompra!:number;
  url:string='';
  carritoProducts!: FormArray;
  totalCompra:number = 0;
  subTotal:number = 0;
  stateIds = [
    {
      id:0,
      name:'Sin Confirmar'
    },
    {
      id:1,
      name:'Por Entregar'
    },
    {
      id:2,
      name:'Entregado'
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private saleServices:SaleService,
    private routeActive: ActivatedRoute,
   ){
    this.saleForm = this.formBuilder.group({
      id: [null],
      carrito: this.formBuilder.group({
        products: this.formBuilder.array([]),
      }),
      state: [null],
    });
   }
ngOnInit(): void {
    this.numeroCompra = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.llenarFormulario();
}

cancelar(){
  this.router.navigate(['/admin/ventas'])
 }

 getSales(){
  this.sales=this.saleServices.getSalesPrueba();
}

llenarFormulario() {
  this.getSales();
  const saleToEdit = this.sales.find(sale => sale.id === this.numeroCompra);
  if (saleToEdit) {
    const productsFormArray = this.saleForm.get('carrito.products')! as FormArray;
    while (productsFormArray.length) {
      productsFormArray.removeAt(0);
    }

    saleToEdit.carrito!.products!.forEach(product => {
      productsFormArray.push(this.formBuilder.group({
        name: product.name,
        cantidad: product.cantidad,
        category: this.formBuilder.group({
          name: product.category?.name,
        }),
        price: product.price,
      }));      
      this.subTotal= product.cantidad! * product.price!;
      this.totalCompra += this.subTotal;
    });

    this.saleForm.patchValue({
      id: saleToEdit.id,
      state: saleToEdit.state,
    });
  }
}

editar(id:number){

}
}

