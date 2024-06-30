import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})
export class NavmenuComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout().pipe(
      catchError(error => {
        console.error('Error logging out', error);
        return of(null);
      })
    ).subscribe(
      response => {
        if (response) {
          console.log('Logout successful', response);
          this.authService.clearCurrentUser();
          this.router.navigate(['/login']);
        } else {
          console.error('Logout response was null or undefined');
        }
      }
    );
  }
}