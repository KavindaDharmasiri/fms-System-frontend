import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-403',
  templateUrl: './error-403.component.html',
  styleUrl: './error-403.component.scss'
})
export class Error403Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
