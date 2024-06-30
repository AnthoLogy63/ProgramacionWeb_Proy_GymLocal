import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUser: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { username, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {});
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }


  //Métodos para guardar el nombre del usuario
  setCurrentUser(username: string): void {
    this.currentUser = username;
  }
  getCurrentUser(): string | null {
    return this.currentUser;
  }
  clearCurrentUser(): void {
    this.currentUser = null;
  }
}