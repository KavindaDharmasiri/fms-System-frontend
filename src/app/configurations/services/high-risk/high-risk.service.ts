import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseDTO} from "../../../shared/dto/ApiResponseDTO";
import {EfmsRuleDTO} from "../../../shared/dto/EfmsRuleDTO";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class HighRiskService {
  private readonly STORAGE_KEY = 'highRiskElement';
  private element: any;
  constructor(private http: HttpClient) { }

  getTblData():Observable<ApiResponseDTO<any>> {
    return this.http.get<ApiResponseDTO<any>>(HttpService.HIGH_RISK_GET_ALL);
  }

  getTransactionStream(): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(HttpService.HIGH_RISK_GET_ALL_STREAM);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        observer.next(data);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };
    });
  }

  setElement(element: any) {
    this.element = element;
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(element));
  }

  getElement() {
    if (!this.element) {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.element = JSON.parse(stored);
      }
    }
    return this.element;
  }

  clearElement() {
    this.element = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

}
