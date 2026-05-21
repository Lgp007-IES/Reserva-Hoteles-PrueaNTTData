import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HabitacionService {
  private url = `${environment.apiUrl}/habitaciones`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.url);
  }

  getById(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.url}/${id}`);
  }

  create(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.url, habitacion);
  }
}
