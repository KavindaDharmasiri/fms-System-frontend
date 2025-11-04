import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../../shared/http/http.service";
import {RoleDTO} from "../../../DTOs/RoleDTO";

@Injectable({
  providedIn: 'root'
})
export class AppUserPrivilegesServiceService {
  constructor(private http: HttpClient) { }

  getAllRoleNames():Observable<RoleDTO[]>{
    return this.http.get<RoleDTO[]>(HttpService.GET_ROLE_NAMES);
  }

  getAllPages(): Observable<string []> {
    return this.http.get<string[]>(HttpService.GET_PAGE_NAMES);
  }

  getAllSections():Observable<string []> {
    return this.http.get<string[]>(HttpService.GET_SECTION_NAMES);
  }

  getAllTasks():Observable<string []> {
    return this.http.get<string[]>(HttpService.GET_TASK_NAMES);
  }

  getAllPrivileges(roleId: number) {
    const params = { roleID: roleId };
    return this.http.get<any []>(HttpService.GET_ALL_PRIVILEGES, {params});
  }

  updatePrivilage(privilage: any){
    return this.http.put<any>(HttpService.UPDATE_PRIVILEGE, privilage);
  }
}
