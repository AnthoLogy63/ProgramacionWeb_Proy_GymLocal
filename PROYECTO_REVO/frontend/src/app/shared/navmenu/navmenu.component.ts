import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-navmenu',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './navmenu.component.html',
  styleUrl: './navmenu.component.css'
})
export class NavmenuComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  logout(): void {
    this.apiService.logout().subscribe(
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
