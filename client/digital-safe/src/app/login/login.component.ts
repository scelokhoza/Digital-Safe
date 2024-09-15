import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../LoginResponse.model';

@Component({
  selector: 'app-login',
  template: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response: LoginResponse) => {
        console.log('Login successful', response.access_token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}