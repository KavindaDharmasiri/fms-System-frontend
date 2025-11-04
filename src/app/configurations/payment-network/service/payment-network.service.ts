import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AddPaymentNetworkDTO, ListPaymentNetworkRequestDTO} from "../dto/PaymentNetworkDTO";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentNetworkService {

  constructor(public http:HttpClient) { }

  addPaymentNetwork(addPaymentNetworkDTO:AddPaymentNetworkDTO){
    return this.http.post(HttpService.PAYMENT_NETWORK_ADD_NEW_PAYMENT_NETWORK,addPaymentNetworkDTO);
  }

  listPaymentNetwork(listPaymentNetworkRequestDTO:ListPaymentNetworkRequestDTO){
    return this.http.post(HttpService.PAYMENT_NETWORK_LIST_PAYMENT_NETWORKS,listPaymentNetworkRequestDTO);
  }

  getPaymentNetworkByID(paymentNetworkID:number){
    const params = new HttpParams()
      .set('paymentNetworkID', paymentNetworkID);
    return this.http.post(HttpService.PAYMENT_NETWORK_GET_PAYMENT_NETWORK_BY_ID,null,{params:params});
  }
}
