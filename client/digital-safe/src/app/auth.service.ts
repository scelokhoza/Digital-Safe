import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from './LoginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { email, password });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (this.isBrowserEnvironment()) {
            localStorage.setItem('access_token', response.access_token);
          }
        })
      );
  }

  logout(): void {
    if (this.isBrowserEnvironment()) {
      localStorage.removeItem('access_token');
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowserEnvironment()) {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowserEnvironment()) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private isBrowserEnvironment(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
