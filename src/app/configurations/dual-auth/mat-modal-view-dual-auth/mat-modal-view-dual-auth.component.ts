import {Component, Inject} from '@angular/core';
import {DualAuthService} from "../service/dual-auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {DualAuthResponseDTO} from "../dto/DualAuthDTO";

@Component({
  selector: 'app-mat-modal-view-dual-auth',
  templateUrl: './mat-modal-view-dual-auth.component.html',
  styleUrl: './mat-modal-view-dual-auth.component.scss'
})
export class MatModalViewDualAuthComponent {

  dualAuthResponseDTO!:DualAuthResponseDTO;
  constructor(
    public dualAuthService:DualAuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Element:', this.data.element);
    this.dualAuthService.getRequestByIdentifier(this.data.element)
      .pipe(
        catchError(
          (err) =>{
            console.log(err)
            Swal.fire(
              ""+err.error.message,
              '' ,
              'error'
            );
            return throwError(err);
          }
        )
      )
      .subscribe(
        (response:any) =>{
          this.dualAuthResponseDTO = response;
        }
      );
  }

}
