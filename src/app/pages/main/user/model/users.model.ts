export class User{
    id?:number;
    name?:string;
    surname?:string;
    dni?:number;
    birthday?:string;
    username?:string;
    password?:string;
    email?:string;
    jwt?:string;
    roles?: string[] = [];
}