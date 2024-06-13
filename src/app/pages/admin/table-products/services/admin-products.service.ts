import { EventEmitter, Injectable, Output } from '@angular/core';
import { Categorie, Product } from '../model/product.model';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../../table-categories/model/category.model';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {
  // category!: Categorie;
  categories: Categorie = {};
  products:Product[]=[];
  @Output() disparadorProducto:EventEmitter<any>= new EventEmitter();
  private subscriptions = new Subscription();
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ category: Categorie }>
  ) { 
    // this.category=new Categorie()
    this.subscriptions.add(
      this.store
        .select('category')
        .subscribe((category) => this.categories = category)
    );
  }

  getProductsByIdAdmin(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/product/${id}`;
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
  getProductsByLowStack(pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/product/filter/lowStock`;
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
  getProductsAdmin(pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/product/`;
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

  editProductAdmin(id:number, product:any):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/product/${id}`;
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
    const finalUrl=`http://localhost:8080/v1/product/${id}`;
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
    const finalUrl=`http://localhost:8080/v1/product/`;
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
