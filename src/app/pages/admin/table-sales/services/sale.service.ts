import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito, Sale } from '../model/sale.model';
import { Categorie } from '../../table-products/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  carrito!: Carrito;
  category!: Categorie;
  ventas:Sale[]=[];
  @Output() disparadorVenta:EventEmitter<any>= new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.carrito= new Carrito();
    this.category=new Categorie();
    this.category.name = 'Lubricante';
    // this.carrito.products=[
    //   {
    //     id: 1,
    //     name: 'Motul 5100',
    //     category: this.category,
    //     description: 'Lo que debes saber de este producto',
    //     price: 1000,
    //     cantidad: 5,
    //     imageUrl: 'assets/img/productos/motul.png'
  
    //   },
    //   {
    //     id: 2,
    //     name: 'Caño de escape YBR',
    //     category: this.category,
    //     description: 'Caño de escape de 4 tiempos',
    //     price: 1000,
    //     cantidad: 1,
    //     imageUrl: 'assets/img/productos/cañoEscape.jpg'
    //   }
    // ]
    // this.ventas=[
    //   {
    //     id:1,
    //     carrito:this.carrito,
    //     state:0
    //   },
    //   {
    //     id:2,
    //     carrito:this.carrito,
    //     state:1
    //   }
    //   ,
    //   {
    //     id:3,
    //     carrito:this.carrito,
    //     state:2
    //   }
    // ]
   }
   getSalesPrueba(): Sale[] {
    return this.ventas;
  }
  getSales(pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/orders/`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl,{params:queryParams})
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

  getSalesByNumber(pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/orders/`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl,{params:queryParams})
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

  getSalesById(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/orders/${id}`;
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

  createOrderAdmin(products:any[]):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/orders/admin`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,products)
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

  getProductByBarCode(barCode:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/product/filter/${barCode}/barCode`;
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
  addProduct(product?: any):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/carts/addProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
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

  getCartById():Observable<any>{
    const finalUrl=`http://localhost:8080/v1/carts/id`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl )
      .subscribe({
        next: (res) => {
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

  removeProduct(id?:number):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/carts/removeProduct/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl )
      .subscribe({
        next: (res) => {
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

  decreaseProduct(product?:any):Observable<any>{
    const finalUrl=`http://localhost:8080/v1/carts/decreaseProduct`;
    return new Observable((obs)=>{
      this.httpClient.post(finalUrl,product)
      .subscribe({
        next: (res) => {
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

}
