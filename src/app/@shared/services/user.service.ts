import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`/users/getAll.php`);
  }

  getUsersFromIds(userIds: number[]): Observable<User[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('id[]', id);
    });

    return this.httpClient.get<User[]>(`/users/getAllById.php`, { headers, params });
  }

  saveUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`/users/save.php`, user);
  }

  delete(id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<void>(`/users/delete.php`, { headers, params });
  }

  login(username: string, password: string): Observable<string> {
    let body = { username: username, password: password };
    return this.httpClient.post<string>(`/users/login.php`, body);
  }

  updatePassword(username: string, oldPassword: string, newPassword: string): Observable<void> {
    let body = { username: username, oldPassword: oldPassword, newPassword: newPassword };
    return this.httpClient.post<void>(`/users/updatePassword.php`, body);
  }
}
