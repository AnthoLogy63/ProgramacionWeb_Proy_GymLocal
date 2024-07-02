import { Component } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-espacios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './espacios.component.html',
  styleUrl: './espacios.component.css'
})
export class EspaciosComponent {
  locales = [
    {
      sede: 'SEDE CENTRO',
      direccion: 'CALLE PAUCARPATA 302 CERCADO',
      referencia: '(FRENTE A LA UNSA)'
    },
    {
      sede: 'SEDE NORTE',
      direccion: 'AV. NORTE 123',
      referencia: '(CERCA AL PARQUE NORTE)'
    },
    {
      sede: 'SEDE SUR',
      direccion: 'AV. SUR 456',
      referencia: '(AL LADO DEL CENTRO COMERCIAL SUR)'
    },
    {
      sede: 'SEDE ESTE',
      direccion: 'CALLE ESTE 789',
      referencia: '(AL FRENTE DEL ESTADIO ESTE)'
    }
  ];
}