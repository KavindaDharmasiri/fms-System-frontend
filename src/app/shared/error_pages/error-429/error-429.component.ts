import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-429',
  templateUrl: './error-429.component.html',
  styleUrl: './error-429.component.scss'
})
export class Error429Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
