import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoleDTO} from "../../user-management/user-role-management/dto/Role";
import {HttpService} from "../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private  http:HttpClient) { }

  saveTransaction(tranList:any){
    return this.http.post(HttpService.SAVE_TEST_TRANSACTION,tranList)
  }
}
