import { EventEmitter, Injectable, Output } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  categories: Category[]=[];
  @Output() disparadorCategoria:EventEmitter<any>= new EventEmitter();

  // @Output() disparadorProducto:EventEmitter<any>= new EventEmitter();

  // products:Product[]=[];
  constructor(
    private httpClient: HttpClient,
  ) { 
    // this.category=new Categorie()
    // this.category.id = 2;
    this.categories= [
      {
        id: 1,
        name: 'Lubricante',
        products: [
          {
            id: 1,
            name: 'Motul 5100',
            description: 'Lo que debes saber de este producto',
            price: 1000,
            stock: 20,
            imageUrl: 'assets/img/productos/motul.png'
          },
          {
            id: 2,
            name: 'AMA',
            description: 'Lo que debes saber de este producto',
            price: 1000,
            stock: 20,
            imageUrl: 'assets/img/productos/motul.png'
          }
        ]
      },
      {
        id: 2,
        name: 'Accesorio',
        products: [
          {
            id: 2,
            name: 'Caño de escape YBR',
            description: 'Caño de escape de 4 tiempos',
            price: 1000,
            stock: 20,
            imageUrl: 'assets/img/productos/cañoEscape.jpg'
          },
          {
            id: 3,
            name: 'Casco',
            description: 'Casco clásico',
            price: 500,
            stock: 20,
            imageUrl: 'assets/img/productos/casco.jpg'
          },
        ]
      },
      {
        id: 3,
        name: 'Repuestos',
        products: [
          {
            id: 5,
            name: 'Bujias',
            description: 'Lo que debes saber de este producto',
            price: 1000,
            stock: 20,
            imageUrl: 'assets/img/productos/motul.png'
          },
          {
            id: 6,
            name: 'Suspensión',
            description: 'Lo que debes saber de este producto',
            price: 1000,
            stock: 20,
            imageUrl: 'assets/img/productos/motul.png'
          }
        ]
      },
    ]
  }
  getCategories():Category[] {
    return this.categories;
  }
  getCategoriesByIdAdmin(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
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

  getCategoriesAdmin(pagination?:any):Observable<any> {
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

  editCategoryAdmin(id:number, category:Category):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
    return new Observable((obs)=>{
      this.httpClient.put(finalUrl, category)
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

  deleteCategoryAdmin(id:number):Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/${id}`;
    return new Observable((obs)=>{
      this.httpClient.delete(finalUrl)
      .subscribe({
        next: (res) => {
          // this.router.navigate(['/home']);
          // Swal.fire('Categoria eliminada con éxito!','sucess');
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

  postCategory(category?: Category): Observable<any> {
    const finalUrl=`http://localhost:8080/v1/category/`;
    return new Observable((obs) => {
      this.httpClient.post(finalUrl, category).subscribe({
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
