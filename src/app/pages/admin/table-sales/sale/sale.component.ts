import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sale } from '../model/sale.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../services/sale.service';
import * as SaleActions from '../store/sale.actions';
import * as CarritoActions from 'src/app/pages/main/carrito/store/carrito.actions';
import Swal from 'sweetalert2';
import { Observable, OperatorFunction, Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  saleForm: FormGroup;
  carritoForm: FormGroup;
  private subscriptions = new Subscription();
  productByBarCode:any = {};
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
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private store:Store<{ salesAdmin:any }>
  ) {
    this.subscriptions.add(
      this.store
      .select('salesAdmin')
      .subscribe((salesAdmin) => {
        this.productByBarCode = salesAdmin
      console.log(this.productByBarCode);
      
      })
    );
    this.carritoForm = this.formBuilder.group({
      cantidad: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.min(1)])
    },
   /* {
      validators: [this.maxValueValidator.bind(this)],
    }*/
      );
    this.saleForm = this.formBuilder.group({
      barCode: new FormControl(null, [Validators.required, Validators.min(1)]),
      products: this.formBuilder.array([])
    /*  id: [''],
      carrito: this.formBuilder.group({
        products: this.formBuilder.array([])
      }),
      state: ['']*/
    });
  }
  ngOnInit(): void {   
    this.saleServices.disparadorVenta.subscribe(data => {
      this.agregarVenta = false;
      this.editarVenta = false;
      this.saleServices.getSalesPrueba().forEach(sale=>{
        this.addProductsToCart(sale.carrito!.products);
        if (sale.id == data) {
        this.carrito.clear();
        sale.carrito?.products?.forEach(product=>{
          this.productosTypeahead.push(product.name);
        })
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
  addProductsToCart (products?:any) {
    this.totalCompra=0;
    this.subTotal=0;
    if (products) {
      products.forEach ((product:any, index:number) => {
        this.carrito.push (
          this.formBuilder.control(product)
        )
        this.subTotal= product.price * product.cantidad;
        this.totalCompra+=this.subTotal;
      });
    }else{
      this.carrito.push (
        this.formBuilder.control({
          name:[''],
          category:[''],
          cantidad:[''],
          precio:['']
        })
      )
    }
  }
  public back() : void{
    this.router.navigate(['/admin/dashboard/sale'])
  }
  borrar(id:number) {
    this.carrito.removeAt(id);
  }

  cancelar() {
    this.agregarVenta = false;
    this.editarVenta = false;
    this.totalCompra = 0;
    this.carrito.clear();
  }


  editar() {
   // this.router.navigate([`/admin/dashboard/product/edit/${this.productId}`]);

  }
  agregar() {
    this.agregarVenta = true;
    this.editarVenta = false;
    this.carrito.clear();
    this.addProductsToCart();
    this.saleServices.getSalesPrueba().forEach(sale=>{
      sale.carrito?.products?.forEach(product=>{
        this.productosTypeahead.push(product.name);
      })
    })
  }

  guardarVenta() {
    const {
      id,
      carrito,
      state,
    } = this.saleForm.value
    const sale = {
      id,
      carrito,
      state
    }
    // this.editarProducto ?
    // this.store.dispatch(ProductosAdminActions.editProduct({id:this.producto.id,product}))
    // : this.store.dispatch(ProductosAdminActions.createProduct(product));
  }
  getProductByBarCode(){
    this.store.dispatch(SaleActions.loadProductByBarCode({barCode:this.saleForm.value.barCode}));
    this.store.select('salesAdmin').subscribe(product => {
      if (product) {
        this.addProductToFormArray(product);
      }
    });
  }
  addProductToFormArray(product: any) {
    console.log(product);
    
    const productGroup = this.formBuilder.group({
      id: [product.data.product_id],
      name: [product.data.name],
      price: [product.data.price],
      stock: [product.data.stock],
      image: [product.data.image],
      description: [product.data.description],
      bar_code: [product.data.bar_code]
    });
    (this.saleForm.get('products') as FormArray).push(productGroup);
    this.removeNullProducts();
   /* if (this.saleForm.value.products.length > 0) {
      (this.saleForm.get('products') as FormArray).removeAt(0);
    }*/
    
    
  }
  removeNullProducts() {
    const products = this.saleForm.get('products') as FormArray;
    for (let i = products.length - 1; i >= 0; i--) { // Iterar en reversa para evitar problemas de índice
      const productGroup = products.at(i) as FormGroup;
      const allNull = Object.values(productGroup.value).every(value => value === null);
      if (allNull) {
        products.removeAt(i);
      }
    }
    console.log(this.saleForm.value.products);
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
}

