import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-408',
  templateUrl: './error-408.component.html',
  styleUrl: './error-408.component.scss'
})
export class Error408Component {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
