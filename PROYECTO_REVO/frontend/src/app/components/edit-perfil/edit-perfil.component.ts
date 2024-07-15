import { Component, OnInit } from '@angular/core';
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
  userData$: Observable<any> = new Observable<any>(); // Inicialización aquí

  constructor(private authService: ApiAuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData$ = this.authService.getUserData();
  }
}