import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Opening } from '../models/opening.model';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  private httpClient = inject(HttpClient);

  getNextOpenings(loadAll: boolean): Observable<Opening[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('loadAll', loadAll);

    return this.httpClient.get<Opening[]>(`/openings/getNext.php`, { headers, params });
  }

  delete(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.delete<void>(`/openings/delete.php`, { headers, params });
  }

  saveOpening(opening: Opening): Observable<void> {
    return this.httpClient.post<void>(`/openings/save.php`, opening);
  }
}
