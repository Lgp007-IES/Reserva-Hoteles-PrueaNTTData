import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private url = `${environment.apiUrl}/hoteles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.url);
  }

  getById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.url}/${id}`);
  }

  create(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.url, hotel);
  }
}
