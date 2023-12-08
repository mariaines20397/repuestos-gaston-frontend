import { Product } from "../../table-products/model/product.model";

export class Category{
    id?:number;
    name?:string;
    products?:Product[];
}