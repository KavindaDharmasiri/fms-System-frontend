import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../shared/http/http.service";
import {EfmsElementDTO} from "../../dto/field-configurator/efms-element.dto";

@Injectable({
  providedIn: 'root'
})
export class TransactionElementService {

  constructor(private http: HttpClient) { }

  getPaymentNetworks():Observable<any> {
    return this.http.get<any>(HttpService.PAY_NET);
  }

    getData(pageIndex: number, pageSize: number, filterDto: {
        templateName: any;
        subject: any;
        templateId: any;
        status: any
    }) {
    return this.http.post<any>(HttpService.LOAD_FIELD_CONFIGURATION+pageIndex+'&size='+pageSize,filterDto);
  }

  getDataById(id: number) {
    return this.http.get<any>(HttpService.LOAD_FIELD_CONFIGURATOR+id);
  }

  getByStatus() {
    return this.http.get<any>(HttpService.LOAD_FIELD_CONFIGURATION_BY_STATUS);
  }

  saveFieldConfiguration(data:EfmsElementDTO) {
    return this.http.post<any>(HttpService.SAVE_FIELD_CONFIGURATION, data);
  }

  deleteFieldDependencie(data:any) {
    return this.http.delete<any>(HttpService.DELETE_FIELD_DEPENDENCIES+data);
  }

  deleteEfmsElement(data:any) {
    return this.http.delete<any>(HttpService.DELETE_EFMS_ELEMENT+data);
  }

  getVariableName() {
    return this.http.get<any>(HttpService.HIGH_RISK_GET_VARIABLE_NAMES);
  }
}
