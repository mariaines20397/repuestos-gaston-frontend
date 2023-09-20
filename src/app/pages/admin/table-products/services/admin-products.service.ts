import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  constructor() { }

  products: Product[] = [
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
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    }
    ,
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    }
    ,
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    }
    ,
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    }
    ,
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    },
    {
      id: 3,
      name: 'Casco',
      description: 'Casco clásico',
      price: 500,
      stock: 20,
      imageUrl: 'assets/img/productos/casco.jpg'
    }
  ]

  getProducts(): Product[] {
    return this.products;
  }
}
