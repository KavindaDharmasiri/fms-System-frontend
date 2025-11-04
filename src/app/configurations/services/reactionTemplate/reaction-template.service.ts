import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpService} from "../../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class ReactionTemplateService {

  constructor(private http: HttpClient) { }

    getData(pageIndex: number, pageSize: number, filterDto: {
        templateName: any;
        subject: any;
        templateId: any;
        status: any
    }) {
    return this.http.post<any>(HttpService.LOAD_REACTION_TEMPLATE_TABLE+pageIndex+'&size='+pageSize,filterDto);
  }

  getAllData() {
    return this.http.get<any>(HttpService.LOAD_ALL_REACTION_TEMPLATE_TABLE);
  }

  getSingleTemplate(id: any) {
    return this.http.get<any>(HttpService.LOAD_REACTION_TEMPLATE_BY_ID+id);
  }

  deleteSingleTemplate(id: any) {
    return this.http.delete<any>(HttpService.DELETE_REACTION_TEMPLATE_BY_ID+id);
  }

  saveReactionTemplate(data :any) {
    return this.http.post<any>(HttpService.SAVE_REACTION_TEMPLATE,data);
  }
}
