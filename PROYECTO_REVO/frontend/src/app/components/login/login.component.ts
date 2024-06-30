import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiAuthService } from '../../core/services/api-auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiAuthService: ApiAuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = new FormData();
      formData.append('username', this.loginForm.value.username);
      formData.append('password', this.loginForm.value.password);

      this.http.post('http://localhost:8000/api/login/', formData)
        .pipe(
          catchError(error => {
            console.error('Error logging in', error);
            return of(null); // Devuelve un observable de null en caso de error
          })
        )
        .subscribe(
          response => {
            if (response) {
              console.log('Login successful', response);
              this.apiAuthService.setCurrentUser(this.loginForm.value.username); // Guarda el nombre de usuario
              this.router.navigate(['/home']); // Redirige a la ruta '/home' si el inicio de sesión es exitoso
            }
          }
        );
    }
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}