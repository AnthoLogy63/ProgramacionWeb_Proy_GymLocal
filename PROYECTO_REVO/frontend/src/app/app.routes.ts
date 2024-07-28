import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EspaciosComponent } from './components/espacios/espacios.component';
import { ViewLoginComponent } from './components/view-login/view-login.component';
import { RutinasComponent} from './components/rutinas/rutinas.component';
import { EditPerfilComponent } from './components/edit-perfil/edit-perfil.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'espacios', component: EspaciosComponent },
  {path: 'viewLogin', component: ViewLoginComponent },
  {path: 'rutinas', component: RutinasComponent},
  {path: 'editarPerfil', component: EditPerfilComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 
];
   
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }