import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rutinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.css']
})
export class RutinasComponent implements OnInit {
  datosFisicos: any[] = [];
  rutinas: any[] = [];
  coaches: any[] = [];
  userId: number = 0;
  usuario: string = "";
  constructor(private apiService: ApiAuthService ) { }

  ngOnInit() {
    this.apiService.getUserId().subscribe(userIdData => {
      this.userId = userIdData.user_id;

      this.apiService.getDatosFisicos(this.userId).subscribe(datosFisicosData => {
        this.datosFisicos = datosFisicosData;
        this.usuario = datosFisicosData.usuario;
      });

      this.apiService.getDatosRutina(this.userId).subscribe(rutinasData => {
        this.rutinas = rutinasData;
      });

      this.apiService.getDatosCoaches(this.userId).subscribe(coachesData => {
        this.coaches = coachesData;
      });
    });
  }
}
