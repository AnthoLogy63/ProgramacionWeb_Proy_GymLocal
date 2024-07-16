import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-edit-perfil',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './edit-perfil.component.html',
  styleUrl: './edit-perfil.component.css'
})
export class EditPerfilComponent implements OnInit {
  userData$: Observable<any> = new Observable<any>(); 
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private authService: ApiAuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData$ = this.authService.getUserData();
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
    this.userData$.subscribe(userData => {
      this.authService.updateUserData({
        first_name: userData.first_name,
        last_name: userData.last_name
      }).subscribe(
        response => {
          console.log('Nombres actualizados con éxito', response);
          this.getUserInfo(); // Actualizar la vista con los nuevos nombres
        },
        error => {
          console.error('Error al actualizar los nombres', error);
        }
      );
    });
  }

  onSaveUsername(): void {
    this.userData$.subscribe(userData => {
      this.authService.updateUserData({
        username: userData.username
      }).subscribe(
        response => {
          console.log('Nombre de usuario actualizado con éxito', response);
          this.getUserInfo(); // Actualizar la vista con el nuevo nombre de usuario
        },
        error => {
          console.error('Error al actualizar el nombre de usuario', error);
        }
      );
    });
  }
}