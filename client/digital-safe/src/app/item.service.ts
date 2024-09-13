import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`, { headers: this.getHeaders() });
  }

  addItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item, { headers: this.getHeaders() });
  }
}