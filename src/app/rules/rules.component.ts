import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Rule } from '@app/@shared/models/rule.model';
import { RuleService } from '@app/@shared/services/rule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  imports: [AsyncPipe, MatCardModule, MatAnchor, MatIcon],
})
export class RulesComponent {
  private ruleService = inject(RuleService);

  rules$!: Observable<Rule[]>;

  constructor() {
    this.rules$ = this.ruleService.getRules();
  }
}
