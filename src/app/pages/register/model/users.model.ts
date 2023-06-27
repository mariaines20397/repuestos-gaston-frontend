export class User{
    id?:number;
    name?:string;
    surname?:string;
    dni?:number;
    birthday?:string;
    address?:string;
    username?:string;
    password?:string;
    email?:string;
    roles?: string[] = [];
}