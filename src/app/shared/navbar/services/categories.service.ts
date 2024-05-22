import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    console.log('entro aca');
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          // this.router.navigate(['/home']);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          console.log(error);
          
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

  getProductsByCategory(idCategory:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/product/filter/${idCategory}/category`;
    console.log('entro aca');
    return new Observable((obs)=>{
      this.httpClient.get(finalUrl)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          this.router.navigate([`/products/categories/${idCategory}`]);
          obs.next(res);
          obs.complete();
        },
        error: (error) => {
          console.log(error);
          
          // Swal.fire('¡Lo siento!', error,'error');
          obs.error(error);
          obs.complete();
        }
      })
    })
  }

}
