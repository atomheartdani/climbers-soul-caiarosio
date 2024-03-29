import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { User, UserRegistration } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll(filter: string, pageIndex: number, pageSize: number): Observable<Page<User>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('pageIndex', pageIndex);
    params = params.append('pageSize', pageSize);

    return this.httpClient.get<Page<User>>(`/users/getAll.php`, { headers, params });
  }

  getUsersFromIds(userIds: number[]): Observable<User[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('id[]', id);
    });

    return this.httpClient.get<User[]>(`/users/getAllById.php`, { headers, params });
  }

  checkUsername(username: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('username', username);

    return this.httpClient.get<boolean>(`/users/exists.php`, { params });
  }

  saveUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`/users/save.php`, user);
  }

  registerUser(user: UserRegistration): Observable<void> {
    return this.httpClient.post<void>(`/users/register.php`, user);
  }

  delete(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append('id', id);

    return this.httpClient.get<void>(`/users/delete.php`, { headers, params });
  }

  login(username: string, password: string): Observable<string> {
    const body = { username: username, password: password };
    return this.httpClient.post<string>(`/users/login.php`, body);
  }

  updatePassword(username: string, oldPassword: string, newPassword: string): Observable<void> {
    const body = { username: username, oldPassword: oldPassword, newPassword: newPassword };
    return this.httpClient.post<void>(`/users/updatePassword.php`, body);
  }
}
