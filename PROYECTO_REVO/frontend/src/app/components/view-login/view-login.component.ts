import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-login.component.html',
  styleUrl: './view-login.component.css'
})
export class ViewLoginComponent implements OnInit {
  userData$: Observable<any> = new Observable<any>(); // Inicialización aquí

  constructor(private authService: ApiAuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData$ = this.authService.getUserData();
  }
}