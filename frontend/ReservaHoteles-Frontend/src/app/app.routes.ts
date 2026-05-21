import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { AlquileresComponent } from './components/alquileres/alquileres.component';

export const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'usuarios',   component: UsuariosComponent },
  { path: 'hoteles',    component: HotelesComponent },
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'alquileres', component: AlquileresComponent },
  { path: '**',         redirectTo: '' }
];
