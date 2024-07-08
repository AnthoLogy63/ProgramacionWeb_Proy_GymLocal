import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiAuthService } from '../../core/services/api-auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiAuthService: ApiAuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.apiAuthService.login(username, password).subscribe(
        response => {
          if (response) {
            console.log('Login successful', response);
            this.apiAuthService.setCurrentUser(username);
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('Error logging in', error);
          this.errorMessage = 'Usuario o contraseña incorrectos. Inténtelo de nuevo.';
        }
      );
    }
  }

  isInvalidControl(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}