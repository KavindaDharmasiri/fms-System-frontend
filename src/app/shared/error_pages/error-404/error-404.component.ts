import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  styleUrl: './error-404.component.scss'
})
export class Error404Component {
  constructor(private location: Location,
  private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  back() {
    this.router.navigate([`/dashboard`]);
  }
}
