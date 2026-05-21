import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">🏨</span>
        <span class="brand-text">ReservaHoteles</span>
      </div>
      <ul class="navbar-links">
        <li><a routerLink="/"            routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Inicio</a></li>
        <li><a routerLink="/usuarios"    routerLinkActive="active">Usuarios</a></li>
        <li><a routerLink="/hoteles"     routerLinkActive="active">Hoteles</a></li>
        <li><a routerLink="/habitaciones" routerLinkActive="active">Habitaciones</a></li>
        <li><a routerLink="/alquileres"  routerLinkActive="active">Alquileres</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      box-shadow: 0 2px 20px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
    }
    .brand-icon { font-size: 1.6rem; }
    .brand-text {
      color: #fff;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .navbar-links {
      list-style: none;
      display: flex;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
    }
    .navbar-links a {
      color: #a0aec0;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.2s;
    }
    .navbar-links a:hover {
      color: #fff;
      background: rgba(255,255,255,0.1);
    }
    .navbar-links a.active {
      color: #fff;
      background: rgba(99, 179, 237, 0.2);
      border: 1px solid rgba(99, 179, 237, 0.4);
    }
  `]
})
export class NavbarComponent {}
