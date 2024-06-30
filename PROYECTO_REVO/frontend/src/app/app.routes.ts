import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { Pagina2Component } from './componentes/pagina2/pagina2.component';
import { PagenotfoundComponent } from './componentes/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pagina1', component: Pagina1Component},
  {path: 'pagina2', component: Pagina2Component},
  {path: '**', component: PagenotfoundComponent},
];
   