export class Search{
    filtrar?:string;
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