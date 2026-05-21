export interface Alquiler {
  idAlquiler?: number;
  idUsuario: number;
  idHotel: number;
  idHabitacion: number;
  fechaEntrada: string;
  fechaSalida: string;
  usuario?: { idUsuario: number; nombre: string };
  hotel?: { idHotel: number; nombre: string };
  habitacion?: { idHabitacion: number; precio: number };
}
