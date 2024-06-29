import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; 

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent implements OnInit {
  helloMessage: string = ''; // Inicialización directa en la declaración

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHelloMessage().subscribe(
      data => {
        this.helloMessage = data.message; // Asigna el mensaje obtenido del backend
      },
      error => {
        console.error('Error al obtener el mensaje:', error); // Manejo de errores
      }
    );
  }
}
