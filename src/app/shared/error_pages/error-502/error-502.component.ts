import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-502',
  templateUrl: './error-502.component.html',
  styleUrl: './error-502.component.scss'
})
export class Error502Component {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
