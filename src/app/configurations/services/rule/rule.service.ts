import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EfmsRuleDTO} from "../../../shared/dto/EfmsRuleDTO";
import {Observable} from "rxjs";
import {ApiResponseDTO} from "../../../shared/dto/ApiResponseDTO";
import {HttpService} from "../../../shared/http/http.service";
import {ApiPageReqDTO} from "../../../shared/dto/ApiPageReqDTO";

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private http: HttpClient) { }

  saveEfmsRule(efmsRule: EfmsRuleDTO):Observable<ApiResponseDTO<EfmsRuleDTO>> {
    return this.http.post<ApiResponseDTO<EfmsRuleDTO>>(HttpService.RULE_SAVE, efmsRule);
  }

  updateEfmsRule(efmsRule: EfmsRuleDTO):Observable<ApiResponseDTO<EfmsRuleDTO>> {
    return this.http.put<ApiResponseDTO<EfmsRuleDTO>>(HttpService.RULE_UPDATE, efmsRule);
  }

  getEfmsRuleById(id:number):Observable<ApiResponseDTO<EfmsRuleDTO>> {
    return this.http.get<ApiResponseDTO<EfmsRuleDTO>>(HttpService.RULE_GET_BY_ID.replace("{id}", id.toString()));
  }

  // filterEfmsRules(efmsRule: EfmsRuleDTO, apiPageReqDTO: ApiPageReqDTO):Observable<ApiResponseDTO<EfmsRuleDTO[]>> {
  //   const params = new HttpParams({
  //     fromObject: Object.fromEntries(
  //       [
  //         ...Object.entries(apiPageReqDTO)
  //           .filter(([_, value]) => value !== null && value !== undefined),
  //         ...Object.entries(efmsRule)
  //           .filter(([_, value]) => value !== null && value !== undefined)
  //       ]
  //     )
  //   });
  //   return this.http.get<ApiResponseDTO<EfmsRuleDTO[]>>(HttpService.RULE_FILTER, {params});
  // }

  filterEfmsRules(efmsRule: EfmsRuleDTO, apiPageReqDTO: ApiPageReqDTO): Observable<ApiResponseDTO<EfmsRuleDTO[]>> {
    const sanitizedEfmsRule = Object.fromEntries(
      Object.entries(efmsRule)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    const sanitizedApiPageReq = Object.fromEntries(
      Object.entries(apiPageReqDTO)
        .filter(([_, value]) => value !== null && value !== undefined)
    );

    const params = new HttpParams({
      fromObject: {
        ...sanitizedApiPageReq,
        ...sanitizedEfmsRule
      }
    });

    return this.http.get<ApiResponseDTO<EfmsRuleDTO[]>>(HttpService.RULE_FILTER, { params });
  }


}
