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
    id?:number;
    name?:string;
}