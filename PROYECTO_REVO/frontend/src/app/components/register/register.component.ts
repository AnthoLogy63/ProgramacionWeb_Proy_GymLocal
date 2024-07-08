import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiRegUserService } from '../../core/services/api-reg-user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiRegUserService: ApiRegUserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }
  

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control) {
          formData.append(key, control.value ?? '');
        }
      });

      this.apiRegUserService.registerUser(formData)
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('User registered successfully', response);
              this.router.navigate(['/login']);
            }
          },
          error: (error) => {
            console.error('Error registering user', error);
          }
        });
    }
  }


  isInvalidControl(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
  
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido.';
      } else if (control.errors['email']) {
        return 'Correo electrónico inválido.';
      }
    }
  
    return null;
  }

  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('repeat_password')?.value;
  }
}