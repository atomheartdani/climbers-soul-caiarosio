import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    /*
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('filters', filters);
    params = params.append('sort', sort);
    
    return this.httpClient.get<Page<Evento>>(`${this.API_URL}/Paginated/`, { headers, params });
    */

    return this.httpClient.get<Reservation[]>(`/reservations/getAll.php`, { headers });
  }

  saveReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(`/reservations/save.php`, reservation);
  }
}
