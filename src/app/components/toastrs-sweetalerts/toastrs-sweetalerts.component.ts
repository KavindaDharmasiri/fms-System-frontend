import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-toastrs-sweetalerts',
  templateUrl: './toastrs-sweetalerts.component.html',
  styleUrl: './toastrs-sweetalerts.component.scss'
})
export class ToastrsSweetalertsComponent {
  constructor(public toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  showError() {
    this.toastr.error('Hello world!', 'Toastr fun!');
  }
  showInfo() {
    this.toastr.info('Hello world!', 'Toastr fun!');
  }
  showWarning() {
    this.toastr.warning('Hello world!', 'Toastr fun!');
  }

  SweetAlert() {
    Swal.fire({
      title: 'Title',
      text: 'Do you want to continue',
      icon: 'success',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    });
  }

}
