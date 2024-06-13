import { Product } from "../../table-products/model/product.model";
export class getAllSale{
    content?:Sale[];
    pegeable?:Pegeable;
    last?: boolean;
    empty?: boolean;
    first?: boolean;
    number?: boolean;
    numberOfElements?: boolean;
    totalPages?: number;
    totalElements?: number;
    size?: number;
    sort?: Sort;
}

export class Pegeable{
    pageNumber?: number;
    pageSize?: number;
    sort?: Sort;
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
}

export class Sort{
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}
export class Sale{
    numberSale?:number;
    name?:string;
    surname?:string;
    dni?:number;
    saleStatus?:string;
    carrito?:Carrito;
    state?:number;
}

export class Carrito{
    id?:number;
    totalPrice?:number;
    numberCart?:number;
    products?:Product[];
}