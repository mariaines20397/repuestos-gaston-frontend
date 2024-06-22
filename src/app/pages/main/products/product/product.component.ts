import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public amountForm: FormGroup;
  private subscriptions = new Subscription();
  private productId!: number;
  public product: any = {};
  private productPayment: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private routeActive: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public productsService: ProductsService,
    private sanitizer: DomSanitizer,
    private store: Store<{ product: any, productAdmin: any, carrito: any }>
  ) {
    this.amountForm = this.formBuilder.group({
      amount: new FormControl(1, [
        Validators.required,
        Validators.minLength(1)
      ]
      ),
    },
      {
        validators: [this.maxValueValidator.bind(this)],
      });
    this.store
      .select(state => state.productAdmin)
      .subscribe((productAdmin) => {
        this.product = productAdmin;
      })
    this.subscriptions.add(
      this.store
        .select('product')
        .subscribe((product) => {
          this.product = product.data;
        })
    )
  }
  ngOnInit(): void {
    this.productId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.store.dispatch(ProductActions.loadProductById({ id: this.productId }));

  }

  public addCart(product: any): void {

    if (this.authService.authenticated()) {
      const amount = this.amountForm.get('amount')!.value;
      const productAdd = {
        amount,
        idProduct: product.product_id
      }
      this.store.dispatch(ProductActions.addProductToCart({ product: productAdd }));
      this.router.navigate(['/carrito']);
    } else {
      Swal.fire('Inicia sesión', `Para agregar un producto al carrito haz click en continuar e inicia sesión.`, 'info')
        .then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        })
    }
  }
  private maxValueValidator(control: AbstractControl): ValidationErrors | null {
    if (control.get('amount')?.value > this.product.stock) {
      control.get('amount')?.setErrors({ maxValueExceeded: true });
      return {
        maxValueExceeded: true
      };
    } else if (control.get('amount')?.value == 0) {
      control.get('amount')?.setErrors({ minValueExceeded: true });
      return {
        minValueExceeded: true
      };
    }

    return null;
  }
  public viewImage(image: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${image}`);
  }
}
