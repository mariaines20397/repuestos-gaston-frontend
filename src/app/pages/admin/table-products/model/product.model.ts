export class getAllProduct{
    content?:Product[];
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


export class Product{
    id?:number;
    name?:string;
    description?:string;
    cantidad?:number;
    price?:number;
    stock?:number;
    imageUrl?:number[] | string;
    category?:Categorie;
}

export class Categorie{
    category_id?:number;
    name?:string;
}
