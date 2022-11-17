import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsersFromIds(userIds: number[]): Observable<User[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('id[]', id);
    });

    return this.httpClient.get<User[]>(`/users/getAllById.php`, { headers, params });
  }
}
