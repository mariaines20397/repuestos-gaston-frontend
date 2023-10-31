import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../model/sale.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../services/sale.service';
import Swal from 'sweetalert2';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;
  sale: any;
  prueba: any[]=[];
  sales: Sale[] = [];
  productos: any[] = [];
  productosTypeahead: any[] = [];
  numeroCompra!: number;
  url: string = '';
  totalCompra: number = 0;
  subTotal: number = 0;
  editarVenta: boolean = false;
  agregarVenta: boolean = false;
  @Input() mostrarVenta: Sale = {};
  stateIds = [
    {
      id: 0,
      name: 'Sin Confirmar'
    },
    {
      id: 1,
      name: 'Por Entregar'
    },
    {
      id: 2,
      name: 'Entregado'
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private saleServices: SaleService,
    private routeActive: ActivatedRoute,
  ) {
    this.saleForm = this.formBuilder.group({
      id: [''],
      carrito: this.formBuilder.group({
        products: this.formBuilder.array([])
      }),
      state: ['']
    });
  }
  ngOnInit(): void {
    this.saleServices.disparadorVenta.subscribe(data => {
      this.agregarVenta = false;
      this.editarVenta = false;
      this.saleServices.getSalesPrueba().forEach(sale=>{
        if (sale.id == data) {
        this.carrito.clear();
        sale.carrito?.products?.forEach(product=>{
          this.productosTypeahead.push(product.name);
        })
        this.addProductsToCart(sale.carrito!.products);
        this.saleForm.patchValue({
          id: sale.id,
          carrito:sale.carrito,
          state:sale.state
        })
      }})
    })
  }
  get carrito (): FormArray {
    return <FormArray>this.saleForm.get('carrito.products'); // Obtener el FormArray del formulario
  }
  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => (term === '' ? this.productosTypeahead :
      this.productosTypeahead.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
    )
  )
  formatter = (result: any) => result.name;
  addProductsToCart (products:any) {
    this.totalCompra=0;
    this.subTotal=0;
    products.forEach ((product:any, index:number) => {
      this.carrito.push (
        this.formBuilder.control(product)
      )
      this.subTotal= product.price * product.cantidad;
      this.totalCompra+=this.subTotal;
    });
  }
  cancelar() {
    this.agregarVenta = false;
    this.editarVenta = false;
    this.sale = {};
    this.productos = [];
    this.totalCompra = 0;
    this.saleForm.reset();
  }


  editar() {
    this.editarVenta = true;
    this.agregarVenta = false;
  }
  agregar() {
    this.agregarVenta = true;
    this.editarVenta = false;
    this.sale = {}
    this.saleForm.reset();
  }

  guardarVenta() {
    const {
      name,
      description,
      price,
      stock,
      imageUrl
    } = this.saleForm.value
    const product = {
      name,
      description,
      price,
      stock,
      imageUrl
    }
    console.log(product);
    // this.editarProducto ?
    // this.store.dispatch(ProductosAdminActions.editProduct({id:this.producto.id,product}))
    // : this.store.dispatch(ProductosAdminActions.createProduct(product));
  }
}

