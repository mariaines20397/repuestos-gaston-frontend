import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private httpClient: HttpClient) {
  }

  public getSales(pagination?: any): Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({ fromObject: { ...pagination } });
    }
    const finalUrl = `http://localhost:8080/v1/orders/`;
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

  public getSalesById(id: number): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/orders/${id}`;
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

  public createOrderSale(): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/orders/`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, {})
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

  public getProductByBarCode(barCode: number): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/product/filter/${barCode}/barCode`;
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
  public addProduct(product?: any): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/carts/addProduct`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, product)
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

  public getCartById(): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/carts/id`;
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

  public removeProduct(id?: number): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/carts/removeProduct/${id}`;
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

  public decreaseProduct(product?: any): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/carts/decreaseProduct`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, product)
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

  public updateStatus(id: number, status: string): Observable<any> {
    const finalUrl = `http://localhost:8080/v1/orders/updateStatus/${id}`;
    return new Observable((obs) => {
      this.httpClient.patch(finalUrl, { sale_status: status })
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
  public getOrderByNumberSale(numberSale: number, pagination?: any): Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({ fromObject: { ...pagination } });
    }
    const finalUrl = `http://localhost:8080/v1/orders/numberSale/${numberSale}`;
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

}
