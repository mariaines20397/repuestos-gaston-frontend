export class Product{
    id?:number;
    name?:string;
    description?:string;
    price?:number;
    stock?:number;
    imageUrl?:string;
    category?:Categorie;
}

export class Categorie{
    id?:number;
    name?:string;
}