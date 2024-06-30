import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: string | null;

  constructor(private apiService: ApiService) {
    this.currentUser = this.apiService.getCurrentUser();
  }
}