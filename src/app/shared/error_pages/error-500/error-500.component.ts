import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-500',
  templateUrl: './error-500.component.html',
  styleUrl: './error-500.component.scss'
})
export class Error500Component {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}
