import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})

export class EditPerfilComponent implements OnInit {
  userData$: Observable<any> = new Observable<any>(); 
  selectedFile: File | null = null;
  namesForm: FormGroup;
  usernameForm: FormGroup;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private authService: ApiAuthService, private fb: FormBuilder) { 
    this.namesForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    this.usernameForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData$ = this.authService.getUserData();
    this.userData$.subscribe(userData => {
      this.namesForm.patchValue({
        firstName: userData.first_name,
        lastName: userData.last_name
      });

      this.usernameForm.patchValue({
        username: userData.username
      });
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSaveAvatar(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('avatar', this.selectedFile);

      this.authService.updateAvatar(formData).subscribe(
        response => {
          console.log('Avatar actualizado con éxito', response);
          this.getUserInfo(); // Actualizar la vista con el nuevo avatar
        },
        error => {
          console.error('Error al actualizar el avatar', error);
        }
      );
    }
  }

  onSaveNames(): void {
    if (this.namesForm.valid) {
      const { firstName, lastName } = this.namesForm.value;
      this.authService.updateUserData({ first_name: firstName, last_name: lastName }).subscribe(
        response => {
          console.log('Nombres actualizados con éxito', response);
          this.getUserInfo(); // Actualizar la vista con los nuevos nombres
        },
        error => {
          console.error('Error al actualizar los nombres', error);
        }
      );
    }
  }

  onSaveUsername(): void {
    if (this.usernameForm.valid) {
      const { username } = this.usernameForm.value;
      this.authService.updateUserData({ username }).subscribe(
        response => {
          console.log('Nombre de usuario actualizado con éxito', response);
          this.getUserInfo(); // Actualizar la vista con el nuevo nombre de usuario
        },
        error => {
          console.error('Error al actualizar el nombre de usuario', error);
        }
      );
    }
  }
}