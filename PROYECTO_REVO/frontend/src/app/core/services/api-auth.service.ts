import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private apiUrl = 'http://localhost:8000/api';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  //Método para establecer Login
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials, { headers: this.getCSRFHeaders(), withCredentials: true }).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/`, {}, { headers: this.getCSRFHeaders(), withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        this.isLoggedInSubject.next(false);
      })
    );
  }
  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
  public checkLoginStatus(): boolean {
    const user = this.getCurrentUser();
    return user !== null;
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

  //Actualizar datos del usuario
  updateAvatar(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/update-avatar/`, formData);
  }
  updateUserData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/update-profile/`, data);
  }

  //Método para enviar y descargar pdf
  downloadTrainingPdf() {
    return this.http.get(`${this.apiUrl}/download_training_pdf/`, { responseType: 'blob', withCredentials: true });
  }
  sendTrainingPdf() {
    return this.http.get(`${this.apiUrl}/send_training_pdf/`, { withCredentials: true });
  }
}