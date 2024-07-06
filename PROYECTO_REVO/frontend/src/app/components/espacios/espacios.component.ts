import { Component } from '@angular/core';
import { ApiAuthService } from '../../core/services/api-auth.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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
      referencia: '(FRENTE A LA UNSA)',
      mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.3939991315037!2d-71.52971332396702!3d-16.404804338283615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424aff97f582b3%3A0x56a256640117aeba!2sRevo%20Sport%20-%20Centro!5e0!3m2!1ses-419!2spe!4v1720237977658!5m2!1ses-419!2spe'
    },
    {
      sede: 'SEDE CERRO COLORADO',
      direccion: 'CA. MIGUEL GRAU 110',
      referencia: '(CERCA A PLAZA LAS AMERICAS)',
      mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.3939991315037!2d-71.52971332396702!3d-16.404804338283615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424aff97f582b3%3A0x56a256640117aeba!2sRevo%20Sport%20-%20Norte!5e0!3m2!1ses-419!2spe!4v1720237977658!5m2!1ses-419!2spe'
    },
    {
      sede: 'SEDE BUSTAMANTE',
      direccion: 'AV. DOLORES 163',
      referencia: '(CERCA DEL COLEGIO PAMER AREQUIPA)',
      mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.258258197388!2d-71.559520423967!3d-16.411705038460184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424b2bb2571d19%3A0x5558a9a5f2cb900b!2sRevo%20Sport%20Sachaca!5e0!3m2!1ses!2spe!4v1720240904301!5m2!1ses!2spe'
    },
    {
      sede: 'SEDE SACHACA',
      direccion: 'VARIANTE DE UCHUCAMAYO 5',
      referencia: '(AL FRENTE DE LA PLANTA BACKUS)',
      mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.9036465736062!2d-71.56044539269598!3d-16.378870010491756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91424a11c8e84a71%3A0xe2cff0b88bb16b97!2sRevo%20Sport%20Cerro%20Colorado!5e0!3m2!1ses!2spe!4v1720240972006!5m2!1ses!2spe'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  getGoogleMapUrl(local: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(local.mapaUrl);
  }
}

