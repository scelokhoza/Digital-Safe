import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  template: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.signup(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signup failed', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}