import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetAllRolesRequestDTO, RoleDTO} from "../dto/Role";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(public httpClient:HttpClient) { }

  addRole(roleDTO:RoleDTO){
    return this.httpClient.post(HttpService.AUTH_ADD_ROLE,roleDTO)
  }
  getAllRoles(getAllRolesRequestDTO:GetAllRolesRequestDTO){
    return this.httpClient.post(HttpService.AUTH_GET_ALL_ROLES,getAllRolesRequestDTO)
  }

  getRollByID(roleID:number){
    const params = new HttpParams()
      .set('roleID', roleID);
    return this.httpClient.get(HttpService.AUTH_GET_ROLE_BY_ID,{params})
  }
  deleteRoleByID(roleID:number){
    const params = new HttpParams()
      .set('roleID', roleID);
    return this.httpClient.delete(HttpService.AUTH_DELETE_ROLE_BY_ID,{params})
  }
}
