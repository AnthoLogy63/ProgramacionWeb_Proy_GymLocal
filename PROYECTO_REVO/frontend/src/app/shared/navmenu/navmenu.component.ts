import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})

export class NavmenuComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private apiAuthService: ApiAuthService, private router: Router) {}

  ngOnInit(): void {
    this.apiAuthService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.apiAuthService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error logging out', error);
      }
    );
  }
}