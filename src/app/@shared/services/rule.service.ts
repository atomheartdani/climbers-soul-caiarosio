import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  constructor(private httpClient: HttpClient) {}

  getRules(): Observable<Rule[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<Rule[]>(`/rules/getAll.php`, { headers });
  }
}
