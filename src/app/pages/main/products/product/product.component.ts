import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products.actions';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  cantidadForm:FormGroup;
  productId!:number;
  constructor(
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private router: Router,
    private store:Store<{ product:Product}>
  ){
    this.cantidadForm = this.formBuilder.group({
      cantidad: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.productId = parseInt(this.routeActive.snapshot.paramMap.get('id')!)
    this.store.dispatch(ProductActions.loadProductById({id:this.productId}))
  }
  comprarAhora(){
    this.router.navigate(['/carrito']);
  }
  agregarCarrito(){
    this.cantidadForm.value.cantidad
    console.log('agregar carrito');
  }
}
