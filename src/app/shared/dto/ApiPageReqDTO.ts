export class ApiPageReqDTO{

  page?:number;
  size?:number;
  sortBy?:string;
  orderBy?:string;

  constructor(  page?:number, size?:number, sortBy?:string, orderBy?:string){ {
    this.page=page;
    this.size=size;
    this.sortBy=sortBy;
    this.orderBy=orderBy;
  }
  }
}
