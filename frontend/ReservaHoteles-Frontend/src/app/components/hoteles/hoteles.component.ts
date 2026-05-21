import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-hoteles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2>🏨 Hoteles</h2>
        <button class="btn-primary" (click)="toggleForm()">
          {{ mostrarFormulario() ? '✕ Cerrar' : '+ Nuevo Hotel' }}
        </button>
      </div>

      @if (mostrarFormulario()) {
        <div class="form-card">
          <h3>Crear Hotel</h3>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Nombre del Hotel</label>
              <input formControlName="nombre" placeholder="Ej: Hotel Mar Azul" />
              @if (form.get('nombre')?.invalid && form.get('nombre')?.touched) {
                <span class="error">El nombre es obligatorio</span>
              }
            </div>
            <div class="form-group">
              <label>Dirección</label>
              <input formControlName="direccion" placeholder="Calle, número, ciudad" />
              @if (form.get('direccion')?.invalid && form.get('direccion')?.touched) {
                <span class="error">La dirección es obligatoria</span>
              }
            </div>
            <div class="form-group">
              <label>Número de Habitaciones</label>
              <input formControlName="numeroHabitacion" type="number" min="1" placeholder="50" />
              @if (form.get('numeroHabitacion')?.invalid && form.get('numeroHabitacion')?.touched) {
                <span class="error">El número de habitaciones es obligatorio</span>
              }
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="form.invalid || cargando()">
                {{ cargando() ? 'Guardando...' : 'Guardar' }}
              </button>
              <button type="button" class="btn-secondary" (click)="toggleForm()">Cancelar</button>
            </div>
          </form>
        </div>
      }

      @if (exito()) {
        <div class="alert-success">✅ Hotel creado correctamente</div>
      }
      @if (error()) {
        <div class="alert-error">❌ {{ error() }}</div>
      }

      <div class="cards-grid">
        @if (cargandoLista()) {
          <div class="loading">Cargando hoteles...</div>
        } @else {
          @for (h of hoteles(); track h.idHotel) {
            <div class="hotel-card">
              <div class="hotel-icon">🏨</div>
              <h3>{{ h.nombre }}</h3>
              <p class="hotel-dir">📍 {{ h.direccion }}</p>
              <p class="hotel-hab">🛏️ {{ h.numeroHabitacion }} habitaciones</p>
              <span class="hotel-id">ID: {{ h.idHotel }}</span>
            </div>
          }
          @empty {
            <div class="empty">No hay hoteles registrados</div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .hotel-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .hotel-icon { font-size: 2rem; }
    .hotel-card h3 { margin: 0; color: #2d3748; font-size: 1.1rem; }
    .hotel-dir { margin: 0; color: #718096; font-size: 0.85rem; }
    .hotel-hab { margin: 0; color: #4a5568; font-size: 0.9rem; font-weight: 500; }
    .hotel-id  { font-size: 0.75rem; color: #a0aec0; margin-top: 0.5rem; }
  `]
})
export class HotelesComponent implements OnInit {
  hoteles          = signal<Hotel[]>([]);
  mostrarFormulario = signal(false);
  cargando         = signal(false);
  cargandoLista    = signal(false);
  exito            = signal(false);
  error            = signal('');
  form: FormGroup;

  constructor(private fb: FormBuilder, private hotelService: HotelService) {
    this.form = this.fb.group({
      nombre:           ['', Validators.required],
      direccion:        ['', Validators.required],
      numeroHabitacion: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() { this.cargarHoteles(); }

  cargarHoteles() {
    this.cargandoLista.set(true);
    this.hotelService.getAll().subscribe({
      next: data => { this.hoteles.set(data); this.cargandoLista.set(false); },
      error: () => { this.cargandoLista.set(false); }
    });
  }

  toggleForm() {
    this.mostrarFormulario.update(v => !v);
    this.form.reset();
    this.exito.set(false);
    this.error.set('');
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.cargando.set(true);
    this.error.set('');
    this.hotelService.create(this.form.value).subscribe({
      next: () => {
        this.cargando.set(false);
        this.exito.set(true);
        this.form.reset();
        this.cargarHoteles();
        setTimeout(() => this.exito.set(false), 3000);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al crear el hotel.');
      }
    });
  }
}
