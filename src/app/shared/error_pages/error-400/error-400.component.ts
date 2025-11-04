import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-400',
  templateUrl: './error-400.component.html',
  styleUrl: './error-400.component.scss'
})
export class Error400Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
