import { Product } from "../../table-products/model/product.model";

export class Sale{
    id?:number;
    carrito?:Carrito;
    state?:number;
}

export class Carrito{
    id?:number;
    products?:Product[];
}