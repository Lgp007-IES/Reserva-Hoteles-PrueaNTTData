import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../models/alquiler.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AlquilerService {
  private url = `${environment.apiUrl}/alquileres`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.url);
  }

  create(alquiler: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(this.url, alquiler);
  }
}
