import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-401',
  templateUrl: './error-401.component.html',
  styleUrl: './error-401.component.scss'
})
export class Error401Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
