import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';  // Flask backend

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  signUp(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/signup`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getKeysOrPasswords() {
    return this.http.get(`${this.apiUrl}/items`);
  }

  addNewItem(type: string, appName: string, value: string) {
    return this.http.post(`${this.apiUrl}/items`, { type, app_name: appName, value });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
