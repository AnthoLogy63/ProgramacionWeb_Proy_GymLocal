import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRegUserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, formData).pipe(
      catchError(error => {
        console.error('Error registering user', error);
        return of(null); 
      })
    );
  }
}
