import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as SalesActions from '../store/sale.actions';
import * as CarritoAdminActions from '../store/carritoAdmin.actions';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  public saleForm: FormGroup;
  public carritoProducts: any = {};
  public salesAdmin: any = {};
  private saleId!: number;
  public totalPrice: number = 0;
  public statusSaleId: string = '';
  public statusSale: any[] = [
    { id: 'PENDING_PAYMENT', value: 'Pendiente de pago' },
    { id: 'PAID', value: 'Pagado' },
    { id: 'DELIVERED', value: 'Entregado' },
    { id: 'REJECTED', value: 'Rechazado' }
  ]
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private sanitizer: DomSanitizer,
    private routeActive: ActivatedRoute,
    private store: Store<{ salesAdmin: any, carritoAdmin: any }>
  ) {
    this.saleForm = this.formBuilder.group({
      barCode: new FormControl(null, [Validators.required, Validators.min(1)]),
      status: new FormControl(null)
    });
    this.store.select('salesAdmin').subscribe((salesAdmin) => {
      this.salesAdmin = salesAdmin.data;
      this.statusSaleId = salesAdmin.data.sale_status;
      this.calculateTotalPrice(salesAdmin.data.products);

    });
  }
  ngOnInit(): void {
    this.loadCarrito();
    this.saleId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    if (this.saleId) {
      this.store.dispatch(SalesActions.loadSaleById({ id: this.saleId }));
    }
  }
  private calculateTotalPrice(products: any): void {
    this.totalPrice = 0;
    products.forEach((data: any) => {
      this.totalPrice += data.sub_total_price
    })
  }
  public back(): void {
    this.router.navigate([`/admin/dashboard/sale`]);
  }
  public editSale(): void {
    this.router.navigate([`/admin/dashboard/sale/edit/${this.saleId}`]);
  }
  public getProductByBarCode(): void {
    this.store.dispatch(SalesActions.loadProductByBarCode({ barCode: this.saleForm.value.barCode }));
    this.store.select('salesAdmin').subscribe(product => {
      if (product) {
        this.addCart(product);
      }
    });
  }
  private addCart(product: any): void {
    if (this.carritoProducts.products.length > 0) {
      this.carritoProducts.products.forEach((data: any) => {
        if (product.data.product_id != data.product_id) {
          const productAdd = {
            amount: 1,
            idProduct: product.data.product_id
          }
          this.store.dispatch(CarritoAdminActions.addProduct({ product: productAdd }));
        }
      })
    } else {
      const productAdd = {
        amount: 1,
        idProduct: product.data.product_id
      }
      this.store.dispatch(CarritoAdminActions.addProduct({ product: productAdd }));
    }


    this.loadCarrito();
  }
  private loadCarrito(): void {
    this.store.dispatch(CarritoAdminActions.loadCartById());
    this.store.select('carritoAdmin').subscribe((product) => {
      if (product) {
        this.carritoProducts = product;
      }
    });

  }
  public decreaseProduct(id: number): void {
    const productAdd = {
      amount: 1,
      idProduct: id
    }
    this.store.dispatch(CarritoAdminActions.decreaseProduct({ product: productAdd }));
  }

  public addProduct(id: number): void {
    const productAdd = {
      amount: 1,
      idProduct: id
    }
    this.store.dispatch(CarritoAdminActions.addProduct({ product: productAdd }));

  }
  public deleteProduct(product: any): void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${product.name} del carrito?`,
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CarritoAdminActions.removeProduct({ id: product.product_id }));
      }
    })
  }
  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  public createOrderSale(): void {
    this.store.dispatch(SalesActions.createSale())
  }
  public updateStatus(): void {
    this.store.dispatch(SalesActions.loadUpdateStatus({ id: this.saleId, status: this.saleForm.value.status }))
  }
}

