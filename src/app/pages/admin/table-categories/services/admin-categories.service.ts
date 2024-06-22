import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  constructor(
    private httpClient: HttpClient,
  ) {}
  public getCategoriesByIdAdmin(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public getCategoriesByName(filters:string,pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/category/filter/${filters}/name`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public getCategoriesAdmin(pagination?:any):Observable<any> {
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/category/`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {          
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public editCategoryAdmin(id:number, category:Category):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
    return new Observable((obs)=>{
      this.httpClient.put(finalUrl, category)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public deleteCategoryAdmin(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl)
      .subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  public postCategory(category?: Category): Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, category).subscribe({
        next: (res) => {
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          Swal.fire('¡Lo siento!', error,'error');
          obs.error(error.error);
          obs.complete();
        },
      });
    });
  }

}
