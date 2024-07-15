import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})

export class NavmenuComponent implements OnInit {
  isLoggedIn: Observable<boolean> = this.apiAuthService.isLoggedIn();

  constructor(private apiAuthService: ApiAuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.apiAuthService.isLoggedIn();
  }

  logout(): void {
    this.apiAuthService.logout().subscribe(
      response => {
        if (response) {
          console.log('Logout successful', response);
        } else {
          console.error('Logout response was null or undefined');
        }
      },
      error => {
        console.error('Logout error', error);
      }
    );
  }
}