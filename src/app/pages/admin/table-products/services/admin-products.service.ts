import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getProductsByIdAdmin(id: number): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/product/${id}`;
    return new Observable((obs) => {
      this.httpClient.get(finalUrl)
        .subscribe({
          next: (res) => {
            obs.next(res);
            obs.complete();
          },
          error: (error) => {
            Swal.fire('¡Lo siento!', error, 'error');
            obs.error(error);
            obs.complete();
          }
        })
    })
  }
  public getProductsByLowStack(pagination?: any): Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({ fromObject: { ...pagination } });
    }
    const finalUrl = `http://localhost:8080/v1/product/filter/lowStock`;
    return new Observable((obs) => {
      this.httpClient.get(finalUrl, { params: queryParams })
        .subscribe({
          next: (res) => {
            obs.next(res);
            obs.complete();
          },
          error: (error) => {
            Swal.fire('¡Lo siento!', error, 'error');
            obs.error(error);
            obs.complete();
          }
        })
    })
  }
  public getProductsAdmin(pagination?: any): Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({ fromObject: { ...pagination } });
    }
    const finalUrl = `http://localhost:8080/v1/product/`;
    return new Observable((obs) => {
      this.httpClient.get(finalUrl, { params: queryParams })
        .subscribe({
          next: (res) => {
            obs.next(res);
            obs.complete();
          },
          error: (error) => {
            Swal.fire('¡Lo siento!', error, 'error');
            obs.error(error);
            obs.complete();
          }
        })
    })
  }

  public editProductAdmin(id: number, product: any): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/product/${id}`;
    return new Observable((obs) => {
      this.httpClient.put(finalUrl, product)
        .subscribe({
          next: (res) => {
            obs.next(res);
            obs.complete();
          },
          error: (error) => {
            Swal.fire('¡Lo siento!', error, 'error');
            obs.error(error);
            obs.complete();
          }
        })
    })
  }

  public deleteProductAdmin(id: number): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/product/${id}`;
    return new Observable((obs) => {
      this.httpClient.delete(finalUrl)
        .subscribe({
          next: (res) => {
            obs.next(res);
            obs.complete();
          },
          error: (error) => {
            Swal.fire('¡Lo siento!', error, 'error');
            obs.error(error);
            obs.complete();
          }
        })
    })
  }

  public postPromotion(product?: Product): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/product/`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, product).subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error, 'error');
          obs.error(error.error);
          obs.complete();
        },
      });
    });
  }
}
