import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  @Output() disparadorCategoria:EventEmitter<any>= new EventEmitter();

  // @Output() disparadorProducto:EventEmitter<any>= new EventEmitter();

  // products:Product[]=[];
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 
    // this.category=new Categorie()
    // this.category.id = 2;
  }

  getCategories():Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/`;
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

  getProductsByCategory(id:number,pagination?:any):Observable<any>{
    let queryParams: any = new HttpParams();
    if (pagination) {
      pagination = Object.fromEntries(Object.entries(pagination).filter(([_, value]) => value != null || value != undefined))
      queryParams = new HttpParams({fromObject:{ ...pagination}});
    }
    const finalUrl=`http://localhost:8080/v1/product/filter/${id}/category`;
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl,{params:queryParams} )
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

}
