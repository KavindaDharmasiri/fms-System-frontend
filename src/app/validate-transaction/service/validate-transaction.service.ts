import { Injectable } from '@angular/core';
import {ValidateTransactionDTO} from "../DTOs/ValidateTransactionDTO";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class ValidateTransactionService {

  constructor(public httpClient:HttpClient) { }

  getAllValidateTransactions(validateTransactionDTO: ValidateTransactionDTO) {
    return this.httpClient.get(HttpService.VALIDATE_TRANSACTION_GET_ALL,{
      params: { ...validateTransactionDTO }
    })
  }
}
