export interface Habitacion {
  idHabitacion?: number;
  tiempoAlquiler: number;
  capacidad: number;
  precio: number;
  idHotel: number;
  hotel?: { idHotel: number; nombre: string };
}
