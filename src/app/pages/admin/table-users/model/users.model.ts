export class getAllUser{
    content?:User[];
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

export class User{
    id?:number;
    name?:string;
    surname?:string;
    dni?:number;
    birthday?:string;
    username?:string;
    password?:string;
    email?:string;
    roles?: string[] = [];
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