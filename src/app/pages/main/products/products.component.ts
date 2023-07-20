import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductsActions from './store/products.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  product={nombre:'producto 1'}
  categoryId!:number;
  productosMostrar:any[]=[];
  nameProduct:string = '';
  listProductsByCategory:any[]=[
    {
      id:1,
      name:'Accesorios para Motos',
      products:[
        {
          id:1,
          name:'Casco',
          price:'1000',
          descriptions:'Casco talle 2',
          img:'./assets/img/productos/casco.jpg'
        },
        {
          id:2,
          name:'Guantes',
          price:'900',
          descriptions:'Guantes térmicos para moto',
          img:'./assets/img/productos/casco.jpg'
        },
        {
          id:3,
          name:'Antiparras',
          price:'1100',
          descriptions:'Antiparras para moto',
          img:'./assets/img/productos/casco.jpg'
        }
      ]
    },
    {
      id:2,
      name:'Caños de escape',
      products:[
        {
          id:1,
          name:'Caño de escape YBR',
          price:'1000',
          descriptions:'Caño de escape de 4 tiempos',
          img:'./assets/img/productos/cañoEscape.jpg'
        },
        {
          id:2,
          name:'Caño de escape 110',
          price:'900',
          descriptions:'Caño de escape 2 tiempos',
          img:'./assets/img/productos/cañoEscape.jpg'
        },
        {
          id:3,
          name:'Caño de escape 125',
          price:'1100',
          descriptions:'Caño de escape sin ruido',
          img:'./assets/img/productos/cañoEscape.jpg'
        }
      ]
    },
    {
      id:3,
      name:'Aceites para Motos',
      products:[
        {
          id:1,
          name:'Motul 5100',
          price:'1000',
          descriptions:'Aceite de motos sintético',
          img:'./assets/img/productos/motul.png'
        },
        {
          id:2,
          name:'Motul 500',
          price:'900',
          descriptions:'Aceite 4T',
          img:'./assets/img/productos/motul.png'
        },
        {
          id:3,
          name:'AMA',
          price:'1100',
          descriptions:'Aceite sintético',
          img:'./assets/img/productos/motul.png'
        }
      ]
    }
  ]
  constructor(
    private store:Store<{ products:any}>,
    private routeActive: ActivatedRoute,
    private route:Router ,

    // public authService: AuthService
   ){
   }
  ngOnInit(): void {
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get('id')!);
    this.store.dispatch(ProductsActions.loadProductsByCategory({id:this.categoryId}));
 this.productosPorCategorias()
  }

  productosPorCategorias(){
    this.listProductsByCategory.forEach(data=>{
      if (data.id == this.categoryId) {
        this.nameProduct = data.name;
        data.products.forEach((e:any)=>{

          this.productosMostrar.push(e)
        })
      }
    })
  }

  productById(id:number){
    this.route.navigate([`/products/${id}`])
  }

}
