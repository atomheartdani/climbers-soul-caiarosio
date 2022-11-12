import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.backendUrl + '/users';
  }

  getUsersFromIds(userIds: number[]): Observable<User[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('id', id);
    });

    return this.httpClient.get<User[]>(`${this.API_URL}/`, { headers, params });
  }
}
