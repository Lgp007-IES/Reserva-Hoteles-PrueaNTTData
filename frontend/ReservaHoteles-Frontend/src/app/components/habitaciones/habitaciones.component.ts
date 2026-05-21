import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionService } from '../../services/habitacion.service';
import { HotelService } from '../../services/hotel.service';
import { Habitacion } from '../../models/habitacion.model';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2>🛏️ Habitaciones</h2>
        <button class="btn-primary" (click)="toggleForm()">
          {{ mostrarFormulario() ? '✕ Cerrar' : '+ Nueva Habitación' }}
        </button>
      </div>

      @if (mostrarFormulario()) {
        <div class="form-card">
          <h3>Crear Habitación</h3>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Hotel</label>
              <select formControlName="idHotel">
                <option value="">Selecciona un hotel</option>
                @for (h of hoteles(); track h.idHotel) {
                  <option [value]="h.idHotel">{{ h.nombre }}</option>
                }
              </select>
              @if (form.get('idHotel')?.invalid && form.get('idHotel')?.touched) {
                <span class="error">Selecciona un hotel</span>
              }
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Capacidad (personas)</label>
                <input formControlName="capacidad" type="number" min="1" placeholder="2" />
                @if (form.get('capacidad')?.invalid && form.get('capacidad')?.touched) {
                  <span class="error">Requerido</span>
                }
              </div>
              <div class="form-group">
                <label>Precio por noche (€)</label>
                <input formControlName="precio" type="number" min="0" step="0.01" placeholder="89.99" />
                @if (form.get('precio')?.invalid && form.get('precio')?.touched) {
                  <span class="error">Requerido</span>
                }
              </div>
            </div>
            <div class="form-group">
              <label>Tiempo mínimo de alquiler (días)</label>
              <input formControlName="tiempoAlquiler" type="number" min="1" placeholder="3" />
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
        <div class="alert-success">✅ Habitación creada correctamente</div>
      }
      @if (error()) {
        <div class="alert-error">❌ {{ error() }}</div>
      }

      <div class="table-card">
        @if (cargandoLista()) {
          <div class="loading">Cargando habitaciones...</div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Hotel</th>
                <th>Capacidad</th>
                <th>Precio/noche</th>
                <th>Mín. días</th>
              </tr>
            </thead>
            <tbody>
              @for (h of habitaciones(); track h.idHabitacion) {
                <tr>
                  <td>{{ h.idHabitacion }}</td>
                  <td>{{ h.hotel?.nombre ?? 'Hotel #' + h.idHotel }}</td>
                  <td>{{ h.capacidad }} personas</td>
                  <td>{{ h.precio | currency:'EUR':'symbol':'1.2-2' }}</td>
                  <td>{{ h.tiempoAlquiler }} días</td>
                </tr>
              }
              @empty {
                <tr><td colspan="5" class="empty">No hay habitaciones registradas</td></tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
  styles: [`
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  `]
})
export class HabitacionesComponent implements OnInit {
  habitaciones     = signal<Habitacion[]>([]);
  hoteles          = signal<Hotel[]>([]);
  mostrarFormulario = signal(false);
  cargando         = signal(false);
  cargandoLista    = signal(false);
  exito            = signal(false);
  error            = signal('');
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private habitacionService: HabitacionService,
    private hotelService: HotelService
  ) {
    this.form = this.fb.group({
      idHotel:        ['', Validators.required],
      capacidad:      [null, [Validators.required, Validators.min(1)]],
      precio:         [null, [Validators.required, Validators.min(0)]],
      tiempoAlquiler: [1]
    });
  }

  ngOnInit() {
    this.cargarHabitaciones();
    this.hotelService.getAll().subscribe(data => this.hoteles.set(data));
  }

  cargarHabitaciones() {
    this.cargandoLista.set(true);
    this.habitacionService.getAll().subscribe({
      next: data => { this.habitaciones.set(data); this.cargandoLista.set(false); },
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
    const payload: Habitacion = {
      ...this.form.value,
      idHotel: Number(this.form.value.idHotel)
    };
    this.habitacionService.create(payload).subscribe({
      next: () => {
        this.cargando.set(false);
        this.exito.set(true);
        this.form.reset();
        this.cargarHabitaciones();
        setTimeout(() => this.exito.set(false), 3000);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al crear la habitación.');
      }
    });
  }
}
