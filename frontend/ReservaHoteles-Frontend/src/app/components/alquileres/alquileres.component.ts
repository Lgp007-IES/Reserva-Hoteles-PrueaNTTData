import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlquilerService } from '../../services/alquiler.service';
import { UsuarioService } from '../../services/usuario.service';
import { HotelService } from '../../services/hotel.service';
import { HabitacionService } from '../../services/habitacion.service';
import { Alquiler } from '../../models/alquiler.model';
import { Usuario } from '../../models/usuario.model';
import { Hotel } from '../../models/hotel.model';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2>📋 Alquileres</h2>
        <button class="btn-primary" (click)="toggleForm()">
          {{ mostrarFormulario() ? '✕ Cerrar' : '+ Nuevo Alquiler' }}
        </button>
      </div>

      @if (mostrarFormulario()) {
        <div class="form-card">
          <h3>Crear Alquiler</h3>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <div class="form-group">
                <label>Usuario</label>
                <select formControlName="idUsuario">
                  <option value="">Selecciona usuario</option>
                  @for (u of usuarios(); track u.idUsuario) {
                    <option [value]="u.idUsuario">{{ u.nombre }}</option>
                  }
                </select>
                @if (form.get('idUsuario')?.invalid && form.get('idUsuario')?.touched) {
                  <span class="error">Selecciona un usuario</span>
                }
              </div>
              <div class="form-group">
                <label>Hotel</label>
                <select formControlName="idHotel">
                  <option value="">Selecciona hotel</option>
                  @for (h of hoteles(); track h.idHotel) {
                    <option [value]="h.idHotel">{{ h.nombre }}</option>
                  }
                </select>
                @if (form.get('idHotel')?.invalid && form.get('idHotel')?.touched) {
                  <span class="error">Selecciona un hotel</span>
                }
              </div>
            </div>
            <div class="form-group">
              <label>Habitación</label>
              <select formControlName="idHabitacion">
                <option value="">Selecciona habitación</option>
                @for (h of habitaciones(); track h.idHabitacion) {
                  <option [value]="h.idHabitacion">
                    Hab. #{{ h.idHabitacion }} — {{ h.capacidad }} personas — {{ h.precio }}€/noche
                  </option>
                }
              </select>
              @if (form.get('idHabitacion')?.invalid && form.get('idHabitacion')?.touched) {
                <span class="error">Selecciona una habitación</span>
              }
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Fecha de Entrada</label>
                <input formControlName="fechaEntrada" type="date" />
                @if (form.get('fechaEntrada')?.invalid && form.get('fechaEntrada')?.touched) {
                  <span class="error">Requerido</span>
                }
              </div>
              <div class="form-group">
                <label>Fecha de Salida</label>
                <input formControlName="fechaSalida" type="date" />
                @if (form.get('fechaSalida')?.invalid && form.get('fechaSalida')?.touched) {
                  <span class="error">Requerido</span>
                }
              </div>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="form.invalid || cargando()">
                {{ cargando() ? 'Guardando...' : 'Guardar Alquiler' }}
              </button>
              <button type="button" class="btn-secondary" (click)="toggleForm()">Cancelar</button>
            </div>
          </form>
        </div>
      }

      @if (exito()) {
        <div class="alert-success">✅ Alquiler creado correctamente</div>
      }
      @if (error()) {
        <div class="alert-error">❌ {{ error() }}</div>
      }

      <div class="table-card">
        @if (cargandoLista()) {
          <div class="loading">Cargando alquileres...</div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Hotel</th>
                <th>Habitación</th>
                <th>Entrada</th>
                <th>Salida</th>
              </tr>
            </thead>
            <tbody>
              @for (a of alquileres(); track a.idAlquiler) {
                <tr>
                  <td>{{ a.idAlquiler }}</td>
                  <td>{{ a.usuario?.nombre ?? 'Usuario #' + a.idUsuario }}</td>
                  <td>{{ a.hotel?.nombre ?? 'Hotel #' + a.idHotel }}</td>
                  <td>Hab. #{{ a.habitacion?.idHabitacion ?? a.idHabitacion }}</td>
                  <td>{{ a.fechaEntrada }}</td>
                  <td>{{ a.fechaSalida }}</td>
                </tr>
              }
              @empty {
                <tr><td colspan="6" class="empty">No hay alquileres registrados</td></tr>
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
export class AlquileresComponent implements OnInit {
  alquileres       = signal<Alquiler[]>([]);
  usuarios         = signal<Usuario[]>([]);
  hoteles          = signal<Hotel[]>([]);
  habitaciones     = signal<Habitacion[]>([]);
  mostrarFormulario = signal(false);
  cargando         = signal(false);
  cargandoLista    = signal(false);
  exito            = signal(false);
  error            = signal('');
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alquilerService: AlquilerService,
    private usuarioService: UsuarioService,
    private hotelService: HotelService,
    private habitacionService: HabitacionService
  ) {
    this.form = this.fb.group({
      idUsuario:    ['', Validators.required],
      idHotel:      ['', Validators.required],
      idHabitacion: ['', Validators.required],
      fechaEntrada: ['', Validators.required],
      fechaSalida:  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarAlquileres();
    this.usuarioService.getAll().subscribe(data => this.usuarios.set(data));
    this.hotelService.getAll().subscribe(data => this.hoteles.set(data));
    this.habitacionService.getAll().subscribe(data => this.habitaciones.set(data));
  }

  cargarAlquileres() {
    this.cargandoLista.set(true);
    this.alquilerService.getAll().subscribe({
      next: data => { this.alquileres.set(data); this.cargandoLista.set(false); },
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
    const payload: Alquiler = {
      idUsuario:    Number(this.form.value.idUsuario),
      idHotel:      Number(this.form.value.idHotel),
      idHabitacion: Number(this.form.value.idHabitacion),
      fechaEntrada: this.form.value.fechaEntrada,
      fechaSalida:  this.form.value.fechaSalida
    };
    this.alquilerService.create(payload).subscribe({
      next: () => {
        this.cargando.set(false);
        this.exito.set(true);
        this.form.reset();
        this.cargarAlquileres();
        setTimeout(() => this.exito.set(false), 3000);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al crear el alquiler. Verifica los datos.');
      }
    });
  }
}
