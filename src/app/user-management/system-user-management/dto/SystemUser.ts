

export class SystemUserDto{
  userId?:number=0;
  userCategory?:string;
  username?: string;
  password?: string;
  nic?:string;
  userRole?:number[];
  contact?:string;
  email?:string;
  empId?:string;
  fullName?:string;
  city?:string;
  address?:string;
  status?:string
  createdBy?:string;
  updatedBy?:string;
}

export class GetAllSystemUsers {
  userId?: number | null;
  username?: string | null;
  nic?: string | null;
  userRole?: number[] | null;
  contact?: string | null;
  email?: string | null;
  empId?: string | null;
  fullName?: string | null;
  status?: string | null;
  page?: number;
  size?:number;
}
