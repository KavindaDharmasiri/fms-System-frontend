import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import {Constant} from "../../util/constant";

/**
 * @author Buddhima Aushan
 * @version 1.0.0
 * @since 2024-12-17
 */
@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(public router:Router) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Log the user out
          this.handleLogout();
        }
        return throwError(() => error); // Pass the error to the caller
      })
    );
  }

  private handleLogout(): void {
    Swal.fire({
      title: 'Session Expired',
      text: '',
      icon: 'warning',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });



    // Redirect to the login page
    this.router.navigate(['/login']);
  }

}
