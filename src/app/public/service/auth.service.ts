import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dto/Auth";
import {HttpService} from "../../shared/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public httpClient:HttpClient) { }

  login(loginDTO:LoginDTO){
    return this.httpClient.post(HttpService.AUTH_USER_LOGIN,loginDTO);
  }
  
  getCurrentUser(){
    const token = sessionStorage.getItem('Access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.httpClient.get(HttpService.AUTH_USER_ME, { headers });
  }
}
