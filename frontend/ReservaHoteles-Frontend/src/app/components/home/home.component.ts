import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { HotelService } from '../../services/hotel.service';
import { HabitacionService } from '../../services/habitacion.service';
import { AlquilerService } from '../../services/alquiler.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home">
      <div class="hero">
        <h1>🏨 Sistema de Reservas</h1>
        <p>Gestiona usuarios, hoteles, habitaciones y alquileres desde un solo lugar.</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👤</div>
          <div class="stat-number">{{ totalUsuarios() }}</div>
          <div class="stat-label">Usuarios</div>
          <a routerLink="/usuarios" class="stat-link">Ver todos →</a>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏨</div>
          <div class="stat-number">{{ totalHoteles() }}</div>
          <div class="stat-label">Hoteles</div>
          <a routerLink="/hoteles" class="stat-link">Ver todos →</a>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🛏️</div>
          <div class="stat-number">{{ totalHabitaciones() }}</div>
          <div class="stat-label">Habitaciones</div>
          <a routerLink="/habitaciones" class="stat-link">Ver todas →</a>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-number">{{ totalAlquileres() }}</div>
          <div class="stat-label">Alquileres</div>
          <a routerLink="/alquileres" class="stat-link">Ver todos →</a>
        </div>
      </div>

      <div class="actions-grid">
        <a routerLink="/usuarios"    class="action-card">
          <span class="action-icon">👤</span>
          <span class="action-title">Gestionar Usuarios</span>
          <span class="action-desc">Crear y listar usuarios del sistema</span>
        </a>
        <a routerLink="/hoteles"     class="action-card">
          <span class="action-icon">🏨</span>
          <span class="action-title">Gestionar Hoteles</span>
          <span class="action-desc">Administrar los hoteles disponibles</span>
        </a>
        <a routerLink="/habitaciones" class="action-card">
          <span class="action-icon">🛏️</span>
          <span class="action-title">Gestionar Habitaciones</span>
          <span class="action-desc">Configurar habitaciones por hotel</span>
        </a>
        <a routerLink="/alquileres"  class="action-card">
          <span class="action-icon">📋</span>
          <span class="action-title">Gestionar Alquileres</span>
          <span class="action-desc">Crear y ver reservas activas</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .home { display: flex; flex-direction: column; gap: 2.5rem; }

    .hero {
      text-align: center;
      padding: 3rem 2rem;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border-radius: 16px;
      color: white;
    }
    .hero h1 { font-size: 2.5rem; margin: 0 0 1rem; font-weight: 700; }
    .hero p { font-size: 1.1rem; color: #a0aec0; margin: 0; }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1.5rem;
    }
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .stat-icon { font-size: 2rem; }
    .stat-number { font-size: 2.2rem; font-weight: 700; color: #2d3748; }
    .stat-label { font-size: 0.85rem; color: #718096; font-weight: 500; }
    .stat-link { font-size: 0.8rem; color: #4299e1; text-decoration: none; margin-top: 0.5rem; }
    .stat-link:hover { text-decoration: underline; }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
    }
    .action-card {
      background: white;
      border-radius: 12px;
      padding: 1.8rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      text-decoration: none;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
      transition: all 0.2s;
      cursor: pointer;
    }
    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      border-color: #4299e1;
    }
    .action-icon { font-size: 2rem; }
    .action-title { font-size: 1rem; font-weight: 600; color: #2d3748; }
    .action-desc { font-size: 0.85rem; color: #718096; }
  `]
})
export class HomeComponent implements OnInit {
  totalUsuarios    = signal(0);
  totalHoteles     = signal(0);
  totalHabitaciones = signal(0);
  totalAlquileres  = signal(0);

  constructor(
    private usuarioService: UsuarioService,
    private hotelService: HotelService,
    private habitacionService: HabitacionService,
    private alquilerService: AlquilerService
  ) {}

  ngOnInit() {
    this.usuarioService.getAll().subscribe(data => this.totalUsuarios.set(data.length));
    this.hotelService.getAll().subscribe(data => this.totalHoteles.set(data.length));
    this.habitacionService.getAll().subscribe(data => this.totalHabitaciones.set(data.length));
    this.alquilerService.getAll().subscribe(data => this.totalAlquileres.set(data.length));
  }
}
