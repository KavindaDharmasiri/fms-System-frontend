import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPaymentNetworkDTO } from '../dto/PaymentNetworkDTO';
import { PaymentNetworkService } from '../service/payment-network.service';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewPaymentComponent implements OnInit {
  actionType: string = "";
  id: string = "";
  title: string = '';
  paymentNetworkForm: FormGroup;
  viewDateTime: boolean = false;
  page_title: string = '';
  showSaveButton: boolean = false;
  showEditButton: boolean = false;
  showBackButton: boolean = false;
  showResetButton: boolean = false;
  createdAt: string = '';
  updatedAt: string = '';
  updateNetworkID: number = 0;
  paymentnetworkOriginalValues: any;

  // Track selected BIN Length
  selectedBINLength: number = 6;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public paymentNetworkService: PaymentNetworkService,
    public router: Router
  ) {
    this.paymentNetworkForm = this.fb.group({
      paymentNetworkID: [""],
      paymentNetworkName: ["", Validators.required],
      BINLength: ["6", Validators.required],
      BIN: [
        "",
        [
          Validators.required,
          this.binLengthValidator(this.selectedBINLength || 6)
        ]
      ],
      Status: [""]
    });

    // Subscribe to BIN Length changes
    this.paymentNetworkForm.get("BINLength")?.valueChanges.subscribe((value) => {
      this.selectedBINLength = Number(value);
      const binControl = this.paymentNetworkForm.get("BIN");
      if (binControl) {
        binControl.setValidators(this.binLengthValidator(this.selectedBINLength));
        binControl.updateValueAndValidity();
      }
    });
  }

  ngOnInit(): void {
    this.actionType = this.route.snapshot.paramMap.get("action") || "";
    this.id = this.route.snapshot.paramMap.get("id") || "";

    if (this.actionType === "add") {
      this.title = "New Payment";
      this.page_title = "Add New Payment Network";
      this.showSaveButton = true;
      this.showResetButton = true;
      this.showEditButton = false;
      this.showBackButton = false;
    } else if (this.actionType === "view") {
      this.viewDateTime = true;
      this.page_title = "View Payment Network";
      this.showSaveButton = false;
      this.showEditButton = true;
      this.showBackButton = true;
      this.paymentNetworkForm.disable();

      if (this.id !== "new") {
        const paymentNetworkId = parseInt(this.id, 10);
        if (isNaN(paymentNetworkId)) {
          console.error("Invalid ID format");
          Swal.fire("Invalid ID", "Please provide a valid numeric ID.", "error");
          return;
        }

        this.paymentNetworkService.getPaymentNetworkByID(paymentNetworkId)
          .pipe(
            catchError(err => {
              console.error("Error fetching network:", err);
              Swal.fire("" + err.error.message, '', 'error');
              return throwError(err);
            })
          )
          .subscribe((response: any) => {
            this.paymentnetworkOriginalValues = {
              paymentNetworkID: response.data.paymentNetworkId,
              paymentNetworkName: response.data.networkName,
              BINLength: response.data.binLength.toString(),
              BIN: response.data.bin.toString(),
              Status: response.data.status
            };
            // Patch values
            this.paymentNetworkForm.patchValue({
              paymentNetworkID: response.data.paymentNetworkId,
              paymentNetworkName: response.data.networkName,
              BINLength: response.data.binLength.toString(),
              BIN: response.data.bin.toString(), // Ensure string
              Status: response.data.status === "ACTIVE"
            });

            this.updateNetworkID = response.data.paymentNetworkId;
            this.selectedBINLength = response.data.binLength;
            this.title = response.data.networkName;

            // Reapply validator with correct length
            const binControl = this.paymentNetworkForm.get('BIN');
            if (binControl) {
              binControl.setValidators(this.binLengthValidator(this.selectedBINLength));
              binControl.updateValueAndValidity();
            }

            // Format timestamps
            this.createdAt = this.formatDate(response.data.createdAt);
            this.updatedAt = this.formatDate(response.data.updatedAt);
          });
      }
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  binLengthValidator(expectedLength: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;
      const isValid = value.length === expectedLength && /^\d+$/.test(value);
      return isValid ? null : { invalidBIN: true };
    };
  }

  validateBIN() {
    const binControl = this.paymentNetworkForm.get("BIN");
    if (binControl) {
      binControl.updateValueAndValidity();
    }
  }

  addNewNetwork() {
    if (this.paymentNetworkForm.invalid) {
      const invalidFields = Object.keys(this.paymentNetworkForm.controls).filter(key => {
        const control = this.paymentNetworkForm.get(key);
        return control && control.invalid;
      });

      this.paymentNetworkForm.markAllAsTouched();
      return;
    }

    const formData = this.paymentNetworkForm.value;
    const addPaymentNetworkDTO = new AddPaymentNetworkDTO(
      this.actionType !== "add" ? this.updateNetworkID : 0,
      formData.paymentNetworkName,
      Number(formData.BIN),
      Number(formData.BINLength),
      formData.Status
    );

    this.paymentNetworkService.addPaymentNetwork(addPaymentNetworkDTO)
      .pipe(
        catchError(err => {
          console.error("Error saving network:", err);
          Swal.fire("" + err.error.message, '', 'error');
          return throwError(err);
        })
      )
      .subscribe((response: any) => {
        if (response.data?.success) {
          Swal.fire(response.data.data, '', 'success');
          this.router.navigate(['/configurations/payment-network']);
        } else {
          Swal.fire("Payment Network Adding Unsuccessful.", '', 'error');
        }
      });
  }

  toggleToEdit() {
    this.page_title = "Edit Payment Network";
    this.showEditButton = false;
    this.showSaveButton = true;
    this.viewDateTime = false;
    this.showBackButton = true;
    this.showResetButton = true;
    this.paymentNetworkForm.enable();
  }

  toggletoView() {
    this.page_title = "View Payment Network";
    this.viewDateTime = true;
    this.showSaveButton = false;
    this.showEditButton = true;
    this.showBackButton = true;
    this.showResetButton = false;
    this.paymentNetworkForm.disable();
    this.router.navigate(['/configurations/payment-network']);
  }

  resetForm() {
    if (this.actionType === "add"){
      this.paymentNetworkForm.patchValue({
        paymentNetworkID: "",
        paymentNetworkName: "",
        BINLength: "6",
        BIN: "",
        Status: false
      })
    }else {
      this.paymentNetworkForm.patchValue({
        paymentNetworkID: this.paymentnetworkOriginalValues.paymentNetworkID,
        paymentNetworkName: this.paymentnetworkOriginalValues.paymentNetworkName,
        BINLength: this.paymentnetworkOriginalValues.BINLength,
        BIN: this.paymentnetworkOriginalValues.BIN, // Ensure string
        Status: this.paymentnetworkOriginalValues.status === "ACTIVE"
      })
    }
  }
}
