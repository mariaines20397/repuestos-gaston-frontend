import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as SalesActions from '../store/sale.actions';
import * as CarritoActions from 'src/app/pages/main/carrito/store/carrito.actions';
import * as CarritoAdminActions from '../store/carritoAdmin.actions';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;
  carritoProducts:any = {};
  salesAdmin:any = {};
  createOrderAdmin:any[]=[];
  saleId!:number;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    private routeActive: ActivatedRoute,
    private store:Store<{ salesAdmin:any, carritoAdmin:any }>
  ) {
    this.saleForm = this.formBuilder.group({
      barCode: new FormControl(null, [Validators.required, Validators.min(1)])
    });
    this.store.select('salesAdmin').subscribe((salesAdmin) => {
        this.salesAdmin = salesAdmin.data;
    });
  }
  ngOnInit(): void {   
    this.loadCarrito();
    this.saleId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
   if (this.saleId) {
      this.store.dispatch(SalesActions.loadSaleById({id:this.saleId}));   }
  }
  back(){
    this.router.navigate([`/admin/dashboard/sale`]);
  }
  editar() {
    this.router.navigate([`/admin/dashboard/sale/edit/${this.saleId}`]);
  }
  getProductByBarCode(){
    this.store.dispatch(SalesActions.loadProductByBarCode({barCode:this.saleForm.value.barCode}));
    this.store.select('salesAdmin').subscribe(product => {
      if (product) {
        this.agregarCarrito(product);
      }
    });
  }
  agregarCarrito(product:any){
      const productAdd = {
        amount:1,
        idProduct: product.data.product_id
      }
    this.store.dispatch(CarritoAdminActions.addProduct({product:productAdd}));
   this.loadCarrito();
  }
  loadCarrito(){
    this.store.dispatch(CarritoAdminActions.loadCartById());
    this.store.select('carritoAdmin').subscribe((product) => {
      if (product) {
        this.carritoProducts = product;
      }
    });
    
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
  orderSale(){
    this.carritoProducts.products.forEach((product:any) => {
      this.createOrderAdmin.push({
        idProduct: product.product_id,
        amount:product.amount
      })
    });
    this.store.dispatch(SalesActions.createSaleAdmin({products:this.createOrderAdmin}))
  }
}

