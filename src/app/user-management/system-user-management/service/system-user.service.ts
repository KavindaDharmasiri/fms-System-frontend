import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetAllSystemUsers, SystemUserDto} from "../dto/SystemUser";
import * as http from "http";
import {GetAllRolesRequestDTO} from "../../user-role-management/dto/Role";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class SystemUserService {

  constructor(public httpClient:HttpClient) { }

  addSystemUser(systemUser:SystemUserDto){
    return this.httpClient.post(HttpService.AUTH_SYSTEM_USER_ADD,systemUser)
  }

  getAllSystemUser(getAllUsers:GetAllSystemUsers , page:number, size:number){
    getAllUsers.page = page;
    getAllUsers.size = size;
    return this.httpClient.post(HttpService.AUTH_SYSTEM_USER_GET_ALL,getAllUsers)
  }

  getSystemUserByID(userId:number){
    const params = new HttpParams()
      .set('userId', userId);
    return this.httpClient.get(HttpService.AUTH_SYSTEM_USER_GET_BY_ID,{params})
  }
  deleteSystemUserByID(userId:number){
    const params = new HttpParams()
      .set('userId', userId);
    return this.httpClient.delete(HttpService.AUTH_SYSTEM_USER_DELETE_BY_ID,{params})
  }

}
