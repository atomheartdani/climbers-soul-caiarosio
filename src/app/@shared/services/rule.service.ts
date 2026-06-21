import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../models/rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private httpClient = inject(HttpClient);

  getRules(): Observable<Rule[]> {
    return this.httpClient.get<Rule[]>(`/rules/getAll.php`);
  }
}
