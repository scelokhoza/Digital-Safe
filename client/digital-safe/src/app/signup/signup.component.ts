import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  template: `
    <h2>Sign Up</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <a routerLink="/login">Login</a></p>
  `
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