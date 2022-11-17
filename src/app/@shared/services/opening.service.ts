import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opening } from '../models/opening.model';

@Injectable({
  providedIn: 'root',
})
export class OpeningService {
  constructor(private httpClient: HttpClient) {}

  getOpenings(): Observable<Opening[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    /*
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('filters', filters);
    params = params.append('sort', sort);
    
    return this.httpClient.get<Page<Evento>>(`${this.API_URL}/Paginated/`, { headers, params });
    */

    return this.httpClient.get<Opening[]>(`/openings/getAll.php`, { headers });
  }
}
