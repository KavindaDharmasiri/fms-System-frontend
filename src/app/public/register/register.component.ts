import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register:', { fullName: this.fullName, email: this.email, password: this.password });
  }
}