import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Constant} from "../../util/constant";


// Adjust path to your Constant file
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem(Constant.ACCESS_TOKEN);
    const tenant = sessionStorage.getItem(Constant.TENANT_ID);
    const portal = sessionStorage.getItem(Constant.PORTAL);
    // const tenant = "auth1";
    console.log('Token:', sessionStorage.getItem(Constant.ACCESS_TOKEN));


    // Clone the request to add new headers
    const clonedRequest = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization if token exists
        ...(tenant && { "X-TenantID": tenant }), // Only add Tenant if tenant ID exists
        ...(portal && { "X-PortalID": portal }), // Only add Portal if tenant ID exists
      },
    });
    console.log('Request Headers:', clonedRequest.headers.keys());
    console.log('Authorization Header:', clonedRequest.headers.get('Authorization'));

    // Pass the cloned request to the next handler
    return next.handle(clonedRequest);
  }
}
