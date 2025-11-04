import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterDualAuthentication, RejectDualAuthDTO} from "../dto/DualAuthDTO";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class DualAuthService {

  constructor(public  http:HttpClient) { }


  getAllUsersWithUsername(){
    return this.http.get(HttpService.LOAD_ALL_USERS_FOR_SELECTORS);
  }
  getAllPendingApproveRequests(filterDualAuthentication:FilterDualAuthentication){
    return this.http.post(HttpService.LOAD_ALL_DUAL_AUTH_REQUESTS,filterDualAuthentication);
  }

  approveRequest(identifier:string){
    const params = new HttpParams()
      .set('identifier', identifier);
    return this.http.post(HttpService.APPROVE_DUAL_AUTH_REQUEST,null,{params:params});
  }

  rejectRequest(rejectDualAuthDTO:RejectDualAuthDTO){
    return this.http.post(HttpService.REJECT_DUAL_AUTH_REQUEST,rejectDualAuthDTO);
  }

  getRequestByIdentifier(identifier:string){
    const params = new HttpParams()
      .set('identifier', identifier);
    return this.http.get(HttpService.LOAD_DUAL_AUTH_REQUEST_BY_IDENTIFIER,{params:params});
  }
}
