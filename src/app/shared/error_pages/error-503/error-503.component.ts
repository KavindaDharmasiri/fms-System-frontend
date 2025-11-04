import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-503',
  templateUrl: './error-503.component.html',
  styleUrl: './error-503.component.scss'
})
export class Error503Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
