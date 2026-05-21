import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="page-header">
        <h2>👤 Usuarios</h2>
        <button class="btn-primary" (click)="toggleForm()">
          {{ mostrarFormulario() ? '✕ Cerrar' : '+ Nuevo Usuario' }}
        </button>
      </div>

      @if (mostrarFormulario()) {
        <div class="form-card">
          <h3>Crear Usuario</h3>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label>Nombre</label>
              <input formControlName="nombre" placeholder="Nombre completo" />
              @if (form.get('nombre')?.invalid && form.get('nombre')?.touched) {
                <span class="error">El nombre es obligatorio</span>
              }
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input formControlName="clave" type="password" placeholder="Contraseña" />
              @if (form.get('clave')?.invalid && form.get('clave')?.touched) {
                <span class="error">La contraseña es obligatoria</span>
              }
            </div>
            <div class="form-group">
              <label>Fecha de Nacimiento</label>
              <input formControlName="fechaNacimiento" type="date" />
              @if (form.get('fechaNacimiento')?.invalid && form.get('fechaNacimiento')?.touched) {
                <span class="error">La fecha es obligatoria</span>
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
        <div class="alert-success">✅ Usuario creado correctamente</div>
      }
      @if (error()) {
        <div class="alert-error">❌ {{ error() }}</div>
      }

      <div class="table-card">
        @if (cargandoLista()) {
          <div class="loading">Cargando usuarios...</div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              @for (u of usuarios(); track u.idUsuario) {
                <tr>
                  <td>{{ u.idUsuario }}</td>
                  <td>{{ u.nombre }}</td>
                  <td>{{ u.fechaNacimiento }}</td>
                </tr>
              }
              @empty {
                <tr><td colspan="3" class="empty">No hay usuarios registrados</td></tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
  styles: [`
    @import url('../../../styles.css');
  `]
})
export class UsuariosComponent implements OnInit {
  usuarios         = signal<Usuario[]>([]);
  mostrarFormulario = signal(false);
  cargando         = signal(false);
  cargandoLista    = signal(false);
  exito            = signal(false);
  error            = signal('');
  form: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.form = this.fb.group({
      nombre:          ['', Validators.required],
      clave:           ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  ngOnInit() { this.cargarUsuarios(); }

  cargarUsuarios() {
    this.cargandoLista.set(true);
    this.usuarioService.getAll().subscribe({
      next: data => { this.usuarios.set(data); this.cargandoLista.set(false); },
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
    this.usuarioService.create(this.form.value).subscribe({
      next: () => {
        this.cargando.set(false);
        this.exito.set(true);
        this.form.reset();
        this.cargarUsuarios();
        setTimeout(() => this.exito.set(false), 3000);
      },
      error: () => {
        this.cargando.set(false);
        this.error.set('Error al crear el usuario. Verifica los datos.');
      }
    });
  }
}
