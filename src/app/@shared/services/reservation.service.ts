import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.backendUrl + '/reservations';
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

    return this.httpClient.get<Reservation[]>(`${this.API_URL}/`, { headers });
  }
}
