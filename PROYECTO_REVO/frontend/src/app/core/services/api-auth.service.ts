import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUser: string | null = null;

  constructor(private http: HttpClient) { }

  //Métodos para determinar el logueo del usuario
  private getCSRFHeaders(): HttpHeaders {
    const csrfToken = this.getCookie('csrftoken');
    return new HttpHeaders({ 'X-CSRFToken': csrfToken });
  }

  private getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    const httpOptions = {
      headers: this.getCSRFHeaders(),
      withCredentials: true
    };
  
    return this.http.post<any>(`${this.apiUrl}/login/`, loginData, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {});
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  //Obtener la info del usuario
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dataUser/`, { withCredentials: true });
  }
  getUserId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user_id/`, { withCredentials: true });
  }
  getDatosFisicos(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/datos_fisicos/${userId}/`, { withCredentials: true });
  }
  getDatosRutina(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rutinas/${userId}/`, { withCredentials: true })
  }
  getDatosCoaches(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/coaches/${userId}/`, { withCredentials: true })
  }

  //Método para descargar pdf
  downloadTrainingPdf() {
    return this.http.get(`${this.apiUrl}/download_training_pdf/`, { responseType: 'blob', withCredentials: true });
  }

  //Método para enviar pdf
  sendTrainingPdf() {
    return this.http.get(`${this.apiUrl}/send_training_pdf/`, { withCredentials: true });
  }
}