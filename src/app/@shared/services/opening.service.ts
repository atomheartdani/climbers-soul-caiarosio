import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opening } from '../models/opening.model';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  constructor(private httpClient: HttpClient) {}

  getNextOpenings(loadAll: boolean): Observable<Opening[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('loadAll', loadAll);

    return this.httpClient.get<Opening[]>(`/openings/getNext.php`, { headers, params });
  }
}
