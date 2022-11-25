import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private httpClient: HttpClient) {}

  deleteReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(`/reservations/delete.php`, reservation);
  }

  getReservations(): Observable<Reservation[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get<Reservation[]>(`/reservations/getAll.php`, { headers });
  }

  saveReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(`/reservations/save.php`, reservation);
  }
}
