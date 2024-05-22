import { Product } from "../../table-products/model/product.model";

export class Category{
    id?:number;
    name?:string;
    products?:Product[];
}

export class getAllCategory{
    content?:getAllCategories[];
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

export class getAllCategories{
    category_id?:number;
    name?:string;
}