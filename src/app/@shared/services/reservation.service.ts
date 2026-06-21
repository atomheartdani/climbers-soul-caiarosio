import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private httpClient = inject(HttpClient);

  deleteReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(`/reservations/delete.php`, reservation);
  }

  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`/reservations/getAll.php`);
  }

  saveReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(`/reservations/save.php`, reservation);
  }
}
