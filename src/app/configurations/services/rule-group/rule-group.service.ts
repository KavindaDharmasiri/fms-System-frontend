import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RuleGroupDTO} from "../../../shared/dto/RuleGroupDTO";
import {Observable} from "rxjs";
import {HttpService} from "../../../shared/http/http.service";
import {ApiResponseDTO} from "../../../shared/dto/ApiResponseDTO";
import {ApiPageReqDTO} from "../../../shared/dto/ApiPageReqDTO";
import {RoleDTO} from "../../../shared/dto/RoleDTO";

@Injectable({
  providedIn: 'root'
})
export class RuleGroupService {

  constructor(private http: HttpClient) { }

  saveRuleGroup(ruleGroup: RuleGroupDTO):Observable<ApiResponseDTO<RuleGroupDTO>> {
    return this.http.post<ApiResponseDTO<RuleGroupDTO>>(HttpService.RULE_GROUP_SAVE, ruleGroup);
  }

  updateRuleGroup(ruleGroup: RuleGroupDTO):Observable<ApiResponseDTO<RuleGroupDTO>> {
    return this.http.put<ApiResponseDTO<RuleGroupDTO>>(HttpService.RULE_GROUP_UPDATE, ruleGroup);
  }

  getRuleGroupById(id:number):Observable<ApiResponseDTO<RuleGroupDTO>> {
    return this.http.get<ApiResponseDTO<RuleGroupDTO>>(HttpService.RULE_GROUP_GET_BY_ID.replace("{id}", id.toString()));
  }

  filterRuleGroups(ruleGroup: RuleGroupDTO, apiPageReqDTO: ApiPageReqDTO):Observable<ApiResponseDTO<RuleGroupDTO[]>> {
    const params = new HttpParams({
      fromObject: Object.fromEntries(
        [
          ...Object.entries(apiPageReqDTO)
            .filter(([_, value]) => value !== null && value !== undefined),
          ...Object.entries(ruleGroup)
            .filter(([_, value]) => value !== null && value !== undefined)
        ]
      )
    });
    return this.http.get<ApiResponseDTO<RuleGroupDTO[]>>(HttpService.RULE_GROUP_FILTER, {params});
  }

  getPaymentNetworks():Observable<any> {
    return this.http.get<any>(HttpService.PAY_NET);
  }

  getAllRoleNames():Observable<RoleDTO[]>{
    return this.http.get<RoleDTO[]>(HttpService.GET_ROLE_NAMES);
  }

  loadRules():Observable<ApiResponseDTO<any>> {
    return this.http.get<ApiResponseDTO<any>>(HttpService.SET_RULES_FOR_REAL_TIME);
  }

  deleteRuleGroup(id: number): Observable<ApiResponseDTO<string>> {
    return this.http.delete<ApiResponseDTO<string>>(HttpService.RULE_GROUP_DELETE+`${id}`);
  }
}
