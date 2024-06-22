import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as CarritoActions from './store/carrito.actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarritoService } from './services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  private subscriptions = new Subscription();
  public cart: any = [];
  public total_price: any;
  public cartForm: FormGroup;
  private productPayment: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ cart: any }>,
    private sanitizer: DomSanitizer,
    private carritoService: CarritoService
  ) {
    this.subscriptions.add(
      this.store
        .select('cart')
        .subscribe((cart) => {
          this.cart = cart.data;
          this.total_price = cart.total_price;
          this.initProducts(cart.data);
        })
    )
    this.cartForm = this.formBuilder.group({
      cantidad: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.min(1)])
    },
      {
        validators: [this.maxValueValidator.bind(this)],
      });

  }
  ngOnInit(): void {
    this.store.dispatch(CarritoActions.loadCartById());

  }
  private initProducts(carrito: any): void {
    carrito.forEach((data: any) => {
      this.cartForm.patchValue({
        cantidad: data.amount
      })
    })
  }

  private maxValueValidator(control: AbstractControl): ValidationErrors | null {
    this.cart?.forEach((product: any) => {
      if (control.get('cantidad')?.value > product.stock) {
        control.get('cantidad')?.setErrors({ maxValueExceeded: true });
        return {
          maxValueExceeded: true
        };
      } else if (control.get('cantidad')?.value == 0) {
        control.get('cantidad')?.setErrors({ minValueExceeded: true });
        return {
          minValueExceeded: true
        };
      }
      return null;
    })
    return null;
  }
  public decreaseProduct(id: number): void {
    const productAdd = {
      amount: 1,
      idProduct: id
    }
    this.store.dispatch(CarritoActions.decreaseProduct({ product: productAdd }));
  }

  public addProduct(id: number): void {
    const productAdd = {
      amount: 1,
      idProduct: id
    }
    this.store.dispatch(CarritoActions.addProduct({ product: productAdd }));

  }

  public cleanCart(): void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar todos los productos del carrito?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CarritoActions.cleanCart());
      }
    })
  }
  public deleteProduct(product: any): void {
    Swal.fire({
      title: `¿Estas seguro que quieres eliminar el producto ${product.name} del carrito?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CarritoActions.removeProduct({ id: product.product_id }));
      }
    })
  }
  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
  public async simulateBuy(): Promise<void> {
    this.cart.forEach((product: any) => {
      this.productPayment.push({
        price: product.price_id_stripe,
        quantity: product.amount
      })
    })
    await this.carritoService.payment(this.productPayment);
  }
}
