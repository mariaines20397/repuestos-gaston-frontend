import { EventEmitter, Injectable, Output } from '@angular/core';
import { Categorie, Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  category!: Categorie;
  products:Product[]=[];
  @Output() disparadorProducto:EventEmitter<any>= new EventEmitter();
  constructor(
    private httpClient: HttpClient,
  ) { 
    this.category=new Categorie()
    this.category.name = 'Lubricante';
    this.products= [
      {
        id: 1,
        name: 'Motul 5100',
        category: this.category,
        description: 'Lo que debes saber de este producto',
        price: 1000,
        stock: 20,
        imageUrl: 'assets/img/productos/motul.png'
  
      },
      {
        id: 2,
        name: 'Caño de escape YBR',
        category: this.category,
        description: 'Caño de escape de 4 tiempos',
        price: 1000,
        stock: 20,
        imageUrl: 'assets/img/productos/cañoEscape.jpg'
      },
      {
        id: 3,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 4,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      }
      ,
      {
        id: 5,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      }
      ,
      {
        id: 6,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      }
      ,
      {
        id: 7,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      }
      ,
      {
        id: 8,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 9,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 10,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 11,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 12,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 13,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 14,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      },
      {
        id: 15,
        name: 'Casco',
        category: this.category,
        description: 'Casco clásico',
        price: 500,
        stock: 20,
        imageUrl: 'assets/img/productos/casco.jpg'
      }
    ]
  }

  

  getProducts(): Product[] {
    return this.products;
  }
  getProductsByIdAdmin(id:number):Observable<any> {
    const finalUrl=`localhost:8080/admin/products/${id}`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }
  getProductsAdmin():Observable<any> {
    const finalUrl=`localhost:8080/admin/products`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  editProductAdmin(id:number, product:Product):Observable<any> {
    const finalUrl=`localhost:8080/admin/products/${id}`;
    return new Observable((obs)=>{
      this.httpClient.put(finalUrl, product)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  deleteProductAdmin(id:number):Observable<any> {
    const finalUrl=`localhost:8080/admin/products/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          // Swal.fire('¡Producto eliminado con éxito!','sucess');
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  postPromotion(product?: Product): Observable<any> {
    const finalUrl=`localhost:8080/admin/products}`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, product).subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          obs.error(error.error);
          obs.complete();
        },
      });
    });
  }
}
