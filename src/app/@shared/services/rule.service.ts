import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private readonly API_URL: string;

  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.backendUrl + '/rules';
  }

  getRules(): Observable<Rule[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get<Rule[]>(`/rules/getAll.php`, { headers });
  }
}
